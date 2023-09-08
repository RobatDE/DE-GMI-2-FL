const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ChannelsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const channels = await db.channels.create(
      {
        id: data.id || undefined,

        redirect_id: data.redirect_id || null,
        channel: data.channel || null,
        content: data.content || null,
        hits: data.hits || null,
        unique_hits: data.unique_hits || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await channels.setProject(data.project || null, {
      transaction,
    });

    await channels.setEvent(data.event || null, {
      transaction,
    });

    await channels.setOwner(data.owner || null, {
      transaction,
    });

    await channels.setRedirect(data.redirect || null, {
      transaction,
    });

    return channels;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const channelsData = data.map((item) => ({
      id: item.id || undefined,

      redirect_id: item.redirect_id || null,
      channel: item.channel || null,
      content: item.content || null,
      hits: item.hits || null,
      unique_hits: item.unique_hits || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
    }));

    // Bulk create items
    const channels = await db.channels.bulkCreate(channelsData, {
      transaction,
    });

    // For each item created, replace relation files

    return channels;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const channels = await db.channels.findByPk(id, {
      transaction,
    });

    await channels.update(
      {
        redirect_id: data.redirect_id || null,
        channel: data.channel || null,
        content: data.content || null,
        hits: data.hits || null,
        unique_hits: data.unique_hits || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await channels.setProject(data.project || null, {
      transaction,
    });

    await channels.setEvent(data.event || null, {
      transaction,
    });

    await channels.setOwner(data.owner || null, {
      transaction,
    });

    await channels.setRedirect(data.redirect || null, {
      transaction,
    });

    return channels;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const channels = await db.channels.findByPk(id, options);

    await channels.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await channels.destroy({
      transaction,
    });

    return channels;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const channels = await db.channels.findOne({ where }, { transaction });

    if (!channels) {
      return channels;
    }

    const output = channels.get({ plain: true });

    output.project = await channels.getProject({
      transaction,
    });

    output.event = await channels.getEvent({
      transaction,
    });

    output.owner = await channels.getOwner({
      transaction,
    });

    output.redirect = await channels.getRedirect({
      transaction,
    });

    return output;
  }

  static async findAll(filter, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.projects,
        as: 'project',
      },

      {
        model: db.events,
        as: 'event',
      },

      {
        model: db.users,
        as: 'owner',
      },

      {
        model: db.channels,
        as: 'redirect',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.channel) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('channels', 'channel', filter.channel),
        };
      }

      if (filter.content) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('channels', 'content', filter.content),
        };
      }

      if (filter.redirect_idRange) {
        const [start, end] = filter.redirect_idRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            redirect_id: {
              ...where.redirect_id,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            redirect_id: {
              ...where.redirect_id,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.hitsRange) {
        const [start, end] = filter.hitsRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            hits: {
              ...where.hits,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            hits: {
              ...where.hits,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.unique_hitsRange) {
        const [start, end] = filter.unique_hitsRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            unique_hits: {
              ...where.unique_hits,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            unique_hits: {
              ...where.unique_hits,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.project) {
        var listItems = filter.project.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          projectId: { [Op.or]: listItems },
        };
      }

      if (filter.event) {
        var listItems = filter.event.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          eventId: { [Op.or]: listItems },
        };
      }

      if (filter.owner) {
        var listItems = filter.owner.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          ownerId: { [Op.or]: listItems },
        };
      }

      if (filter.redirect) {
        var listItems = filter.redirect.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          redirectId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.channels.count({
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.channels.findAndCountAll({
          where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('channels', 'id', query),
        ],
      };
    }

    const records = await db.channels.findAll({
      attributes: ['id', 'id'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['id', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.id,
    }));
  }
};

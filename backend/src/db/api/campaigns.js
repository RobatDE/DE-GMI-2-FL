const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class CampaignsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const campaigns = await db.campaigns.create(
      {
        id: data.id || undefined,

        is_published: data.is_published || false,

        date_added: data.date_added || null,
        date_modified: data.date_modified || null,
        checked_out: data.checked_out || null,
        checked_out_by: data.checked_out_by || null,
        name: data.name || null,
        description: data.description || null,
        publish_up: data.publish_up || null,
        publish_down: data.publish_down || null,
        canvas_settings: data.canvas_settings || null,
        allow_restart: data.allow_restart || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await campaigns.setProgram(data.program || null, {
      transaction,
    });

    await campaigns.setCreated_by_user(data.created_by_user || null, {
      transaction,
    });

    await campaigns.setModified_by_user(data.modified_by_user || null, {
      transaction,
    });

    await campaigns.setChecked_out_by_user(data.checked_out_by_user || null, {
      transaction,
    });

    return campaigns;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const campaignsData = data.map((item) => ({
      id: item.id || undefined,

      is_published: item.is_published || false,

      date_added: item.date_added || null,
      date_modified: item.date_modified || null,
      checked_out: item.checked_out || null,
      checked_out_by: item.checked_out_by || null,
      name: item.name || null,
      description: item.description || null,
      publish_up: item.publish_up || null,
      publish_down: item.publish_down || null,
      canvas_settings: item.canvas_settings || null,
      allow_restart: item.allow_restart || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
    }));

    // Bulk create items
    const campaigns = await db.campaigns.bulkCreate(campaignsData, {
      transaction,
    });

    // For each item created, replace relation files

    return campaigns;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const campaigns = await db.campaigns.findByPk(id, {
      transaction,
    });

    await campaigns.update(
      {
        is_published: data.is_published || false,

        date_added: data.date_added || null,
        date_modified: data.date_modified || null,
        checked_out: data.checked_out || null,
        checked_out_by: data.checked_out_by || null,
        name: data.name || null,
        description: data.description || null,
        publish_up: data.publish_up || null,
        publish_down: data.publish_down || null,
        canvas_settings: data.canvas_settings || null,
        allow_restart: data.allow_restart || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await campaigns.setProgram(data.program || null, {
      transaction,
    });

    await campaigns.setCreated_by_user(data.created_by_user || null, {
      transaction,
    });

    await campaigns.setModified_by_user(data.modified_by_user || null, {
      transaction,
    });

    await campaigns.setChecked_out_by_user(data.checked_out_by_user || null, {
      transaction,
    });

    return campaigns;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const campaigns = await db.campaigns.findByPk(id, options);

    await campaigns.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await campaigns.destroy({
      transaction,
    });

    return campaigns;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const campaigns = await db.campaigns.findOne({ where }, { transaction });

    if (!campaigns) {
      return campaigns;
    }

    const output = campaigns.get({ plain: true });

    output.projects_campaing = await campaigns.getProjects_campaing({
      transaction,
    });

    output.program = await campaigns.getProgram({
      transaction,
    });

    output.created_by_user = await campaigns.getCreated_by_user({
      transaction,
    });

    output.modified_by_user = await campaigns.getModified_by_user({
      transaction,
    });

    output.checked_out_by_user = await campaigns.getChecked_out_by_user({
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
        model: db.programs,
        as: 'program',
      },

      {
        model: db.users,
        as: 'created_by_user',
      },

      {
        model: db.users,
        as: 'modified_by_user',
      },

      {
        model: db.users,
        as: 'checked_out_by_user',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('campaigns', 'name', filter.name),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('campaigns', 'description', filter.description),
        };
      }

      if (filter.canvas_settings) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'campaigns',
            'canvas_settings',
            filter.canvas_settings,
          ),
        };
      }

      if (filter.date_addedRange) {
        const [start, end] = filter.date_addedRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            date_added: {
              ...where.date_added,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            date_added: {
              ...where.date_added,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.date_modifiedRange) {
        const [start, end] = filter.date_modifiedRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            date_modified: {
              ...where.date_modified,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            date_modified: {
              ...where.date_modified,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.checked_outRange) {
        const [start, end] = filter.checked_outRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            checked_out: {
              ...where.checked_out,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            checked_out: {
              ...where.checked_out,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.checked_out_byRange) {
        const [start, end] = filter.checked_out_byRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            checked_out_by: {
              ...where.checked_out_by,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            checked_out_by: {
              ...where.checked_out_by,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.publish_upRange) {
        const [start, end] = filter.publish_upRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            publish_up: {
              ...where.publish_up,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            publish_up: {
              ...where.publish_up,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.publish_downRange) {
        const [start, end] = filter.publish_downRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            publish_down: {
              ...where.publish_down,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            publish_down: {
              ...where.publish_down,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.allow_restartRange) {
        const [start, end] = filter.allow_restartRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            allow_restart: {
              ...where.allow_restart,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            allow_restart: {
              ...where.allow_restart,
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

      if (filter.is_published) {
        where = {
          ...where,
          is_published: filter.is_published,
        };
      }

      if (filter.program) {
        var listItems = filter.program.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          programId: { [Op.or]: listItems },
        };
      }

      if (filter.created_by_user) {
        var listItems = filter.created_by_user.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          created_by_userId: { [Op.or]: listItems },
        };
      }

      if (filter.modified_by_user) {
        var listItems = filter.modified_by_user.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          modified_by_userId: { [Op.or]: listItems },
        };
      }

      if (filter.checked_out_by_user) {
        var listItems = filter.checked_out_by_user.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          checked_out_by_userId: { [Op.or]: listItems },
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
          count: await db.campaigns.count({
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
      : await db.campaigns.findAndCountAll({
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
          Utils.ilike('campaigns', 'id', query),
        ],
      };
    }

    const records = await db.campaigns.findAll({
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

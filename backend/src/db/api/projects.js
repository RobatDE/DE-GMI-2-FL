const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ProjectsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const projects = await db.projects.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        description: data.description || null,
        date_added: data.date_added || null,
        date_modified: data.date_modified || null,
        modified_by: data.modified_by || null,
        public_on: data.public_on || null,
        start_on: data.start_on || null,
        end_on: data.end_on || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await projects.setCampaing(data.campaing || null, {
      transaction,
    });

    await projects.setTeam(data.team || null, {
      transaction,
    });

    await projects.setCreated_by_user(data.created_by_user || null, {
      transaction,
    });

    await projects.setModified_by_user(data.modified_by_user || null, {
      transaction,
    });

    return projects;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const projectsData = data.map((item) => ({
      id: item.id || undefined,

      name: item.name || null,
      description: item.description || null,
      date_added: item.date_added || null,
      date_modified: item.date_modified || null,
      modified_by: item.modified_by || null,
      public_on: item.public_on || null,
      start_on: item.start_on || null,
      end_on: item.end_on || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
    }));

    // Bulk create items
    const projects = await db.projects.bulkCreate(projectsData, {
      transaction,
    });

    // For each item created, replace relation files

    return projects;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const projects = await db.projects.findByPk(id, {
      transaction,
    });

    await projects.update(
      {
        name: data.name || null,
        description: data.description || null,
        date_added: data.date_added || null,
        date_modified: data.date_modified || null,
        modified_by: data.modified_by || null,
        public_on: data.public_on || null,
        start_on: data.start_on || null,
        end_on: data.end_on || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await projects.setCampaing(data.campaing || null, {
      transaction,
    });

    await projects.setTeam(data.team || null, {
      transaction,
    });

    await projects.setCreated_by_user(data.created_by_user || null, {
      transaction,
    });

    await projects.setModified_by_user(data.modified_by_user || null, {
      transaction,
    });

    return projects;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const projects = await db.projects.findByPk(id, options);

    await projects.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await projects.destroy({
      transaction,
    });

    return projects;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const projects = await db.projects.findOne({ where }, { transaction });

    if (!projects) {
      return projects;
    }

    const output = projects.get({ plain: true });

    output.assets_project = await projects.getAssets_project({
      transaction,
    });

    output.categories_project = await projects.getCategories_project({
      transaction,
    });

    output.channels_project = await projects.getChannels_project({
      transaction,
    });

    output.events_project = await projects.getEvents_project({
      transaction,
    });

    output.tasks_project = await projects.getTasks_project({
      transaction,
    });

    output.teams_project = await projects.getTeams_project({
      transaction,
    });

    output.campaing = await projects.getCampaing({
      transaction,
    });

    output.team = await projects.getTeam({
      transaction,
    });

    output.created_by_user = await projects.getCreated_by_user({
      transaction,
    });

    output.modified_by_user = await projects.getModified_by_user({
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
        model: db.campaigns,
        as: 'campaing',
      },

      {
        model: db.teams,
        as: 'team',
      },

      {
        model: db.users,
        as: 'created_by_user',
      },

      {
        model: db.users,
        as: 'modified_by_user',
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
          [Op.and]: Utils.ilike('projects', 'name', filter.name),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('projects', 'description', filter.description),
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

      if (filter.modified_byRange) {
        const [start, end] = filter.modified_byRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            modified_by: {
              ...where.modified_by,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            modified_by: {
              ...where.modified_by,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.public_onRange) {
        const [start, end] = filter.public_onRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            public_on: {
              ...where.public_on,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            public_on: {
              ...where.public_on,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.start_onRange) {
        const [start, end] = filter.start_onRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            start_on: {
              ...where.start_on,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            start_on: {
              ...where.start_on,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.end_onRange) {
        const [start, end] = filter.end_onRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            end_on: {
              ...where.end_on,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            end_on: {
              ...where.end_on,
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

      if (filter.campaing) {
        var listItems = filter.campaing.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          campaingId: { [Op.or]: listItems },
        };
      }

      if (filter.team) {
        var listItems = filter.team.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          teamId: { [Op.or]: listItems },
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
          count: await db.projects.count({
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
      : await db.projects.findAndCountAll({
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
          Utils.ilike('projects', 'id', query),
        ],
      };
    }

    const records = await db.projects.findAll({
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

const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ProgramsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const programs = await db.programs.create(
      {
        id: data.id || undefined,

        date_added: data.date_added || null,
        date_modified: data.date_modified || null,
        name: data.name || null,
        description: data.description || null,
        goal: data.goal || null,
        start_date: data.start_date || null,
        end_date: data.end_date || null,
        allow_restart: data.allow_restart || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await programs.setCompany(data.company || null, {
      transaction,
    });

    await programs.setCreated_by_user(data.created_by_user || null, {
      transaction,
    });

    await programs.setModified_by_user(data.modified_by_user || null, {
      transaction,
    });

    return programs;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const programsData = data.map((item) => ({
      id: item.id || undefined,

      date_added: item.date_added || null,
      date_modified: item.date_modified || null,
      name: item.name || null,
      description: item.description || null,
      goal: item.goal || null,
      start_date: item.start_date || null,
      end_date: item.end_date || null,
      allow_restart: item.allow_restart || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
    }));

    // Bulk create items
    const programs = await db.programs.bulkCreate(programsData, {
      transaction,
    });

    // For each item created, replace relation files

    return programs;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const programs = await db.programs.findByPk(id, {
      transaction,
    });

    await programs.update(
      {
        date_added: data.date_added || null,
        date_modified: data.date_modified || null,
        name: data.name || null,
        description: data.description || null,
        goal: data.goal || null,
        start_date: data.start_date || null,
        end_date: data.end_date || null,
        allow_restart: data.allow_restart || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await programs.setCompany(data.company || null, {
      transaction,
    });

    await programs.setCreated_by_user(data.created_by_user || null, {
      transaction,
    });

    await programs.setModified_by_user(data.modified_by_user || null, {
      transaction,
    });

    return programs;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const programs = await db.programs.findByPk(id, options);

    await programs.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await programs.destroy({
      transaction,
    });

    return programs;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const programs = await db.programs.findOne({ where }, { transaction });

    if (!programs) {
      return programs;
    }

    const output = programs.get({ plain: true });

    output.campaigns_program = await programs.getCampaigns_program({
      transaction,
    });

    output.promptresponses_program = await programs.getPromptresponses_program({
      transaction,
    });

    output.company = await programs.getCompany({
      transaction,
    });

    output.created_by_user = await programs.getCreated_by_user({
      transaction,
    });

    output.modified_by_user = await programs.getModified_by_user({
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
        model: db.companies,
        as: 'company',
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
          [Op.and]: Utils.ilike('programs', 'name', filter.name),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('programs', 'description', filter.description),
        };
      }

      if (filter.goal) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('programs', 'goal', filter.goal),
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

      if (filter.start_dateRange) {
        const [start, end] = filter.start_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            start_date: {
              ...where.start_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            start_date: {
              ...where.start_date,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.end_dateRange) {
        const [start, end] = filter.end_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            end_date: {
              ...where.end_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            end_date: {
              ...where.end_date,
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

      if (filter.company) {
        var listItems = filter.company.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          companyId: { [Op.or]: listItems },
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
          count: await db.programs.count({
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
      : await db.programs.findAndCountAll({
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
          Utils.ilike('programs', 'id', query),
        ],
      };
    }

    const records = await db.programs.findAll({
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

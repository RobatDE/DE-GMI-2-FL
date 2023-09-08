const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class PromptsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const prompts = await db.prompts.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        prompt: data.prompt || null,
        jsonprompt: data.jsonprompt || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return prompts;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const promptsData = data.map((item) => ({
      id: item.id || undefined,

      name: item.name || null,
      prompt: item.prompt || null,
      jsonprompt: item.jsonprompt || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
    }));

    // Bulk create items
    const prompts = await db.prompts.bulkCreate(promptsData, { transaction });

    // For each item created, replace relation files

    return prompts;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const prompts = await db.prompts.findByPk(id, {
      transaction,
    });

    await prompts.update(
      {
        name: data.name || null,
        prompt: data.prompt || null,
        jsonprompt: data.jsonprompt || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return prompts;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const prompts = await db.prompts.findByPk(id, options);

    await prompts.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await prompts.destroy({
      transaction,
    });

    return prompts;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const prompts = await db.prompts.findOne({ where }, { transaction });

    if (!prompts) {
      return prompts;
    }

    const output = prompts.get({ plain: true });

    output.promptresponses_prompt_id =
      await prompts.getPromptresponses_prompt_id({
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
    let include = [];

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
          [Op.and]: Utils.ilike('prompts', 'name', filter.name),
        };
      }

      if (filter.prompt) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('prompts', 'prompt', filter.prompt),
        };
      }

      if (filter.jsonprompt) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('prompts', 'jsonprompt', filter.jsonprompt),
        };
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
          count: await db.prompts.count({
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
      : await db.prompts.findAndCountAll({
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
          Utils.ilike('prompts', 'id', query),
        ],
      };
    }

    const records = await db.prompts.findAll({
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

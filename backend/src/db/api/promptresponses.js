const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class PromptresponsesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const promptresponses = await db.promptresponses.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        engine: data.engine || null,
        model: data.model || null,
        prompt: data.prompt || null,
        response: data.response || null,
        jsonprompt: data.jsonprompt || null,
        jsonresponse: data.jsonresponse || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await promptresponses.setProgram(data.program || null, {
      transaction,
    });

    await promptresponses.setPrompt_id(data.prompt_id || null, {
      transaction,
    });

    return promptresponses;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const promptresponsesData = data.map((item) => ({
      id: item.id || undefined,

      name: item.name || null,
      engine: item.engine || null,
      model: item.model || null,
      prompt: item.prompt || null,
      response: item.response || null,
      jsonprompt: item.jsonprompt || null,
      jsonresponse: item.jsonresponse || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
    }));

    // Bulk create items
    const promptresponses = await db.promptresponses.bulkCreate(
      promptresponsesData,
      { transaction },
    );

    // For each item created, replace relation files

    return promptresponses;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const promptresponses = await db.promptresponses.findByPk(id, {
      transaction,
    });

    await promptresponses.update(
      {
        name: data.name || null,
        engine: data.engine || null,
        model: data.model || null,
        prompt: data.prompt || null,
        response: data.response || null,
        jsonprompt: data.jsonprompt || null,
        jsonresponse: data.jsonresponse || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await promptresponses.setProgram(data.program || null, {
      transaction,
    });

    await promptresponses.setPrompt_id(data.prompt_id || null, {
      transaction,
    });

    return promptresponses;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const promptresponses = await db.promptresponses.findByPk(id, options);

    await promptresponses.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await promptresponses.destroy({
      transaction,
    });

    return promptresponses;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const promptresponses = await db.promptresponses.findOne(
      { where },
      { transaction },
    );

    if (!promptresponses) {
      return promptresponses;
    }

    const output = promptresponses.get({ plain: true });

    output.program = await promptresponses.getProgram({
      transaction,
    });

    output.prompt_id = await promptresponses.getPrompt_id({
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
        model: db.prompts,
        as: 'prompt_id',
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
          [Op.and]: Utils.ilike('promptresponses', 'name', filter.name),
        };
      }

      if (filter.engine) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('promptresponses', 'engine', filter.engine),
        };
      }

      if (filter.model) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('promptresponses', 'model', filter.model),
        };
      }

      if (filter.prompt) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('promptresponses', 'prompt', filter.prompt),
        };
      }

      if (filter.response) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('promptresponses', 'response', filter.response),
        };
      }

      if (filter.jsonprompt) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'promptresponses',
            'jsonprompt',
            filter.jsonprompt,
          ),
        };
      }

      if (filter.jsonresponse) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'promptresponses',
            'jsonresponse',
            filter.jsonresponse,
          ),
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

      if (filter.program) {
        var listItems = filter.program.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          programId: { [Op.or]: listItems },
        };
      }

      if (filter.prompt_id) {
        var listItems = filter.prompt_id.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          prompt_idId: { [Op.or]: listItems },
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
          count: await db.promptresponses.count({
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
      : await db.promptresponses.findAndCountAll({
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
          Utils.ilike('promptresponses', 'id', query),
        ],
      };
    }

    const records = await db.promptresponses.findAll({
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

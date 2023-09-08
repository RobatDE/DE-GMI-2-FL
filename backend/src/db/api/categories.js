const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class CategoriesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const categories = await db.categories.create(
      {
        id: data.id || undefined,

        is_published: data.is_published || false,

        date_added: data.date_added || null,
        date_modified: data.date_modified || null,
        checked_out: data.checked_out || null,
        title: data.title || null,
        description: data.description || null,
        alias: data.alias || null,
        color: data.color || null,
        bundle: data.bundle || null,
        checked_out_by: data.checked_out_by || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await categories.setCreated_by_user(data.created_by_user || null, {
      transaction,
    });

    await categories.setModified_by_user(data.modified_by_user || null, {
      transaction,
    });

    await categories.setChecked_out_by_user(data.checked_out_by_user || null, {
      transaction,
    });

    await categories.setProject(data.project || null, {
      transaction,
    });

    await categories.setCategory(data.category || null, {
      transaction,
    });

    return categories;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const categoriesData = data.map((item) => ({
      id: item.id || undefined,

      is_published: item.is_published || false,

      date_added: item.date_added || null,
      date_modified: item.date_modified || null,
      checked_out: item.checked_out || null,
      title: item.title || null,
      description: item.description || null,
      alias: item.alias || null,
      color: item.color || null,
      bundle: item.bundle || null,
      checked_out_by: item.checked_out_by || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
    }));

    // Bulk create items
    const categories = await db.categories.bulkCreate(categoriesData, {
      transaction,
    });

    // For each item created, replace relation files

    return categories;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const categories = await db.categories.findByPk(id, {
      transaction,
    });

    await categories.update(
      {
        is_published: data.is_published || false,

        date_added: data.date_added || null,
        date_modified: data.date_modified || null,
        checked_out: data.checked_out || null,
        title: data.title || null,
        description: data.description || null,
        alias: data.alias || null,
        color: data.color || null,
        bundle: data.bundle || null,
        checked_out_by: data.checked_out_by || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await categories.setCreated_by_user(data.created_by_user || null, {
      transaction,
    });

    await categories.setModified_by_user(data.modified_by_user || null, {
      transaction,
    });

    await categories.setChecked_out_by_user(data.checked_out_by_user || null, {
      transaction,
    });

    await categories.setProject(data.project || null, {
      transaction,
    });

    await categories.setCategory(data.category || null, {
      transaction,
    });

    return categories;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const categories = await db.categories.findByPk(id, options);

    await categories.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await categories.destroy({
      transaction,
    });

    return categories;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const categories = await db.categories.findOne({ where }, { transaction });

    if (!categories) {
      return categories;
    }

    const output = categories.get({ plain: true });

    output.assets_category = await categories.getAssets_category({
      transaction,
    });

    output.created_by_user = await categories.getCreated_by_user({
      transaction,
    });

    output.modified_by_user = await categories.getModified_by_user({
      transaction,
    });

    output.checked_out_by_user = await categories.getChecked_out_by_user({
      transaction,
    });

    output.project = await categories.getProject({
      transaction,
    });

    output.category = await categories.getCategory({
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

      {
        model: db.projects,
        as: 'project',
      },

      {
        model: db.categories,
        as: 'category',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.title) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('categories', 'title', filter.title),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'categories',
            'description',
            filter.description,
          ),
        };
      }

      if (filter.alias) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('categories', 'alias', filter.alias),
        };
      }

      if (filter.color) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('categories', 'color', filter.color),
        };
      }

      if (filter.bundle) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('categories', 'bundle', filter.bundle),
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

      if (filter.project) {
        var listItems = filter.project.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          projectId: { [Op.or]: listItems },
        };
      }

      if (filter.category) {
        var listItems = filter.category.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          categoryId: { [Op.or]: listItems },
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
          count: await db.categories.count({
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
      : await db.categories.findAndCountAll({
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
          Utils.ilike('categories', 'id', query),
        ],
      };
    }

    const records = await db.categories.findAll({
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

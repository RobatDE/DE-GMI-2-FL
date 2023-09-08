const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class AssetsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const assets = await db.assets.create(
      {
        id: data.id || undefined,

        is_published: data.is_published || false,

        date_added: data.date_added || null,
        date_modified: data.date_modified || null,
        checked_out: data.checked_out || null,
        title: data.title || null,
        description: data.description || null,
        alias: data.alias || null,
        storage_location: data.storage_location || null,
        path: data.path || null,
        url: data.url || null,
        remote_path: data.remote_path || null,
        original_file_name: data.original_file_name || null,
        lang: data.lang || null,
        publish_up: data.publish_up || null,
        publish_down: data.publish_down || null,
        download_count: data.download_count || null,
        unique_download_count: data.unique_download_count || null,
        revision: data.revision || null,
        extension: data.extension || null,
        mime: data.mime || null,
        size: data.size || null,
        disallow: data.disallow || false,

        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await assets.setProject(data.project || null, {
      transaction,
    });

    await assets.setCategory(data.category || null, {
      transaction,
    });

    await assets.setCreated_by_user(data.created_by_user || null, {
      transaction,
    });

    await assets.setChecked_out_by_user(data.checked_out_by_user || null, {
      transaction,
    });

    return assets;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const assetsData = data.map((item) => ({
      id: item.id || undefined,

      is_published: item.is_published || false,

      date_added: item.date_added || null,
      date_modified: item.date_modified || null,
      checked_out: item.checked_out || null,
      title: item.title || null,
      description: item.description || null,
      alias: item.alias || null,
      storage_location: item.storage_location || null,
      path: item.path || null,
      url: item.url || null,
      remote_path: item.remote_path || null,
      original_file_name: item.original_file_name || null,
      lang: item.lang || null,
      publish_up: item.publish_up || null,
      publish_down: item.publish_down || null,
      download_count: item.download_count || null,
      unique_download_count: item.unique_download_count || null,
      revision: item.revision || null,
      extension: item.extension || null,
      mime: item.mime || null,
      size: item.size || null,
      disallow: item.disallow || false,

      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
    }));

    // Bulk create items
    const assets = await db.assets.bulkCreate(assetsData, { transaction });

    // For each item created, replace relation files

    return assets;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const assets = await db.assets.findByPk(id, {
      transaction,
    });

    await assets.update(
      {
        is_published: data.is_published || false,

        date_added: data.date_added || null,
        date_modified: data.date_modified || null,
        checked_out: data.checked_out || null,
        title: data.title || null,
        description: data.description || null,
        alias: data.alias || null,
        storage_location: data.storage_location || null,
        path: data.path || null,
        url: data.url || null,
        remote_path: data.remote_path || null,
        original_file_name: data.original_file_name || null,
        lang: data.lang || null,
        publish_up: data.publish_up || null,
        publish_down: data.publish_down || null,
        download_count: data.download_count || null,
        unique_download_count: data.unique_download_count || null,
        revision: data.revision || null,
        extension: data.extension || null,
        mime: data.mime || null,
        size: data.size || null,
        disallow: data.disallow || false,

        updatedById: currentUser.id,
      },
      { transaction },
    );

    await assets.setProject(data.project || null, {
      transaction,
    });

    await assets.setCategory(data.category || null, {
      transaction,
    });

    await assets.setCreated_by_user(data.created_by_user || null, {
      transaction,
    });

    await assets.setChecked_out_by_user(data.checked_out_by_user || null, {
      transaction,
    });

    return assets;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const assets = await db.assets.findByPk(id, options);

    await assets.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await assets.destroy({
      transaction,
    });

    return assets;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const assets = await db.assets.findOne({ where }, { transaction });

    if (!assets) {
      return assets;
    }

    const output = assets.get({ plain: true });

    output.project = await assets.getProject({
      transaction,
    });

    output.category = await assets.getCategory({
      transaction,
    });

    output.created_by_user = await assets.getCreated_by_user({
      transaction,
    });

    output.checked_out_by_user = await assets.getChecked_out_by_user({
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
        model: db.categories,
        as: 'category',
      },

      {
        model: db.users,
        as: 'created_by_user',
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

      if (filter.title) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('assets', 'title', filter.title),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('assets', 'description', filter.description),
        };
      }

      if (filter.alias) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('assets', 'alias', filter.alias),
        };
      }

      if (filter.storage_location) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'assets',
            'storage_location',
            filter.storage_location,
          ),
        };
      }

      if (filter.path) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('assets', 'path', filter.path),
        };
      }

      if (filter.url) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('assets', 'url', filter.url),
        };
      }

      if (filter.remote_path) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('assets', 'remote_path', filter.remote_path),
        };
      }

      if (filter.original_file_name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'assets',
            'original_file_name',
            filter.original_file_name,
          ),
        };
      }

      if (filter.lang) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('assets', 'lang', filter.lang),
        };
      }

      if (filter.extension) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('assets', 'extension', filter.extension),
        };
      }

      if (filter.mime) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('assets', 'mime', filter.mime),
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

      if (filter.download_countRange) {
        const [start, end] = filter.download_countRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            download_count: {
              ...where.download_count,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            download_count: {
              ...where.download_count,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.unique_download_countRange) {
        const [start, end] = filter.unique_download_countRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            unique_download_count: {
              ...where.unique_download_count,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            unique_download_count: {
              ...where.unique_download_count,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.revisionRange) {
        const [start, end] = filter.revisionRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            revision: {
              ...where.revision,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            revision: {
              ...where.revision,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.sizeRange) {
        const [start, end] = filter.sizeRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            size: {
              ...where.size,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            size: {
              ...where.size,
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

      if (filter.disallow) {
        where = {
          ...where,
          disallow: filter.disallow,
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

      if (filter.created_by_user) {
        var listItems = filter.created_by_user.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          created_by_userId: { [Op.or]: listItems },
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
          count: await db.assets.count({
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
      : await db.assets.findAndCountAll({
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
          Utils.ilike('assets', 'id', query),
        ],
      };
    }

    const records = await db.assets.findAll({
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

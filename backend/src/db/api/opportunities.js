const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class OpportunitiesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const opportunities = await db.opportunities.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        public_on: data.public_on || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await opportunities.setCompany(data.company || null, {
      transaction,
    });

    await opportunities.setMarket(data.market || null, {
      transaction,
    });

    return opportunities;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const opportunitiesData = data.map((item) => ({
      id: item.id || undefined,

      name: item.name || null,
      public_on: item.public_on || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
    }));

    // Bulk create items
    const opportunities = await db.opportunities.bulkCreate(opportunitiesData, {
      transaction,
    });

    // For each item created, replace relation files

    return opportunities;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const opportunities = await db.opportunities.findByPk(id, {
      transaction,
    });

    await opportunities.update(
      {
        name: data.name || null,
        public_on: data.public_on || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await opportunities.setCompany(data.company || null, {
      transaction,
    });

    await opportunities.setMarket(data.market || null, {
      transaction,
    });

    return opportunities;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const opportunities = await db.opportunities.findByPk(id, options);

    await opportunities.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await opportunities.destroy({
      transaction,
    });

    return opportunities;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const opportunities = await db.opportunities.findOne(
      { where },
      { transaction },
    );

    if (!opportunities) {
      return opportunities;
    }

    const output = opportunities.get({ plain: true });

    output.company = await opportunities.getCompany({
      transaction,
    });

    output.market = await opportunities.getMarket({
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
        model: db.markets,
        as: 'market',
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
          [Op.and]: Utils.ilike('opportunities', 'name', filter.name),
        };
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

      if (filter.market) {
        var listItems = filter.market.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          marketId: { [Op.or]: listItems },
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
          count: await db.opportunities.count({
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
      : await db.opportunities.findAndCountAll({
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
          Utils.ilike('opportunities', 'id', query),
        ],
      };
    }

    const records = await db.opportunities.findAll({
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

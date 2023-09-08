const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class CompaniesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const companies = await db.companies.create(
      {
        id: data.id || undefined,

        is_published: data.is_published || false,

        date_added: data.date_added || null,
        date_modified: data.date_modified || null,
        checked_out: data.checked_out || null,
        checked_out_by: data.checked_out_by || null,
        social_cache: data.social_cache || null,
        score: data.score || null,
        companyemail: data.companyemail || null,
        companyaddress1: data.companyaddress1 || null,
        companyaddress2: data.companyaddress2 || null,
        companyphone: data.companyphone || null,
        companycity: data.companycity || null,
        companystate: data.companystate || null,
        companyzipcode: data.companyzipcode || null,
        companycountry: data.companycountry || null,
        companyname: data.companyname || null,
        companywebsite: data.companywebsite || null,
        companyindustry: data.companyindustry || null,
        companydescription: data.companydescription || null,
        companynumber_of_employees: data.companynumber_of_employees || null,
        companyfax: data.companyfax || null,
        companyannual_revenue: data.companyannual_revenue || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await companies.setOwner(data.owner || null, {
      transaction,
    });

    await companies.setCreated_by_user(data.created_by_user || null, {
      transaction,
    });

    await companies.setModified_by_user(data.modified_by_user || null, {
      transaction,
    });

    await companies.setChecked_out_by_user(data.checked_out_by_user || null, {
      transaction,
    });

    return companies;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const companiesData = data.map((item) => ({
      id: item.id || undefined,

      is_published: item.is_published || false,

      date_added: item.date_added || null,
      date_modified: item.date_modified || null,
      checked_out: item.checked_out || null,
      checked_out_by: item.checked_out_by || null,
      social_cache: item.social_cache || null,
      score: item.score || null,
      companyemail: item.companyemail || null,
      companyaddress1: item.companyaddress1 || null,
      companyaddress2: item.companyaddress2 || null,
      companyphone: item.companyphone || null,
      companycity: item.companycity || null,
      companystate: item.companystate || null,
      companyzipcode: item.companyzipcode || null,
      companycountry: item.companycountry || null,
      companyname: item.companyname || null,
      companywebsite: item.companywebsite || null,
      companyindustry: item.companyindustry || null,
      companydescription: item.companydescription || null,
      companynumber_of_employees: item.companynumber_of_employees || null,
      companyfax: item.companyfax || null,
      companyannual_revenue: item.companyannual_revenue || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
    }));

    // Bulk create items
    const companies = await db.companies.bulkCreate(companiesData, {
      transaction,
    });

    // For each item created, replace relation files

    return companies;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const companies = await db.companies.findByPk(id, {
      transaction,
    });

    await companies.update(
      {
        is_published: data.is_published || false,

        date_added: data.date_added || null,
        date_modified: data.date_modified || null,
        checked_out: data.checked_out || null,
        checked_out_by: data.checked_out_by || null,
        social_cache: data.social_cache || null,
        score: data.score || null,
        companyemail: data.companyemail || null,
        companyaddress1: data.companyaddress1 || null,
        companyaddress2: data.companyaddress2 || null,
        companyphone: data.companyphone || null,
        companycity: data.companycity || null,
        companystate: data.companystate || null,
        companyzipcode: data.companyzipcode || null,
        companycountry: data.companycountry || null,
        companyname: data.companyname || null,
        companywebsite: data.companywebsite || null,
        companyindustry: data.companyindustry || null,
        companydescription: data.companydescription || null,
        companynumber_of_employees: data.companynumber_of_employees || null,
        companyfax: data.companyfax || null,
        companyannual_revenue: data.companyannual_revenue || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await companies.setOwner(data.owner || null, {
      transaction,
    });

    await companies.setCreated_by_user(data.created_by_user || null, {
      transaction,
    });

    await companies.setModified_by_user(data.modified_by_user || null, {
      transaction,
    });

    await companies.setChecked_out_by_user(data.checked_out_by_user || null, {
      transaction,
    });

    return companies;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const companies = await db.companies.findByPk(id, options);

    await companies.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await companies.destroy({
      transaction,
    });

    return companies;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const companies = await db.companies.findOne({ where }, { transaction });

    if (!companies) {
      return companies;
    }

    const output = companies.get({ plain: true });

    output.programs_company = await companies.getPrograms_company({
      transaction,
    });

    output.markets_company = await companies.getMarkets_company({
      transaction,
    });

    output.opportunities_company = await companies.getOpportunities_company({
      transaction,
    });

    output.owner = await companies.getOwner({
      transaction,
    });

    output.created_by_user = await companies.getCreated_by_user({
      transaction,
    });

    output.modified_by_user = await companies.getModified_by_user({
      transaction,
    });

    output.checked_out_by_user = await companies.getChecked_out_by_user({
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
        as: 'owner',
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

      if (filter.social_cache) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'companies',
            'social_cache',
            filter.social_cache,
          ),
        };
      }

      if (filter.companyemail) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'companies',
            'companyemail',
            filter.companyemail,
          ),
        };
      }

      if (filter.companyaddress1) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'companies',
            'companyaddress1',
            filter.companyaddress1,
          ),
        };
      }

      if (filter.companyaddress2) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'companies',
            'companyaddress2',
            filter.companyaddress2,
          ),
        };
      }

      if (filter.companyphone) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'companies',
            'companyphone',
            filter.companyphone,
          ),
        };
      }

      if (filter.companycity) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('companies', 'companycity', filter.companycity),
        };
      }

      if (filter.companystate) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'companies',
            'companystate',
            filter.companystate,
          ),
        };
      }

      if (filter.companyzipcode) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'companies',
            'companyzipcode',
            filter.companyzipcode,
          ),
        };
      }

      if (filter.companycountry) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'companies',
            'companycountry',
            filter.companycountry,
          ),
        };
      }

      if (filter.companyname) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('companies', 'companyname', filter.companyname),
        };
      }

      if (filter.companywebsite) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'companies',
            'companywebsite',
            filter.companywebsite,
          ),
        };
      }

      if (filter.companyindustry) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'companies',
            'companyindustry',
            filter.companyindustry,
          ),
        };
      }

      if (filter.companydescription) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'companies',
            'companydescription',
            filter.companydescription,
          ),
        };
      }

      if (filter.companyfax) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('companies', 'companyfax', filter.companyfax),
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

      if (filter.scoreRange) {
        const [start, end] = filter.scoreRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            score: {
              ...where.score,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            score: {
              ...where.score,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.companynumber_of_employeesRange) {
        const [start, end] = filter.companynumber_of_employeesRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            companynumber_of_employees: {
              ...where.companynumber_of_employees,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            companynumber_of_employees: {
              ...where.companynumber_of_employees,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.companyannual_revenueRange) {
        const [start, end] = filter.companyannual_revenueRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            companyannual_revenue: {
              ...where.companyannual_revenue,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            companyannual_revenue: {
              ...where.companyannual_revenue,
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

      if (filter.owner) {
        var listItems = filter.owner.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          ownerId: { [Op.or]: listItems },
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
          count: await db.companies.count({
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
      : await db.companies.findAndCountAll({
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
          Utils.ilike('companies', 'id', query),
        ],
      };
    }

    const records = await db.companies.findAll({
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

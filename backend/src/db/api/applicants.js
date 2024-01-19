const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class applicantsDBApi {

applicantsData = data.map((data) => ({
    id: data.id || undefined,
    Name: data.name || null,
    Description: data.description || null,
    Gender: data.Gender || null,
    GenderIdentity: data.GenderIdentity || null,
    Occupation: data.Occupation || null,
    EducationLevel: data.EducationLevel || null,
    AgeRange: data.AgeRange || null,
    IncomeRange: data.IncomeRange || null,
    Age: data.Age || null,
    MaritalStatus: data.MaritalStatus || null,
    EmploymentType: data.EmploymentType  || null,
    HouseholdComposition: data.HouseholdComposition  || null,
    Income: data.Income || 0,
    Religion: data.Religion  || null,
    Nationality: data.Nationality  || null,
    Geography: data.Geography  || null,
    Ethnicity: data.Ethnicity  || null,
    Race: data.Race  || null,
    Language: data.Language  || null,
    PoliticalAffiliation: data.PoliticalAffiliation  || null,
    HomeOwnership: data.HomeOwnership  || null,
    // PersonalityDetails: DataTypes.JSON,
    // PositionDetails: DataTypes.JSON,
    // CommunicationsDetails: DataTypes.JSON,
    // MotivationsDetails: DataTypes.JSON,
    createdById: currentUser.id,
    updatedById: currentUser.id,
}));



  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const applicants = await db.applicants.create(applicantsData, { transaction }, );

    console.log('Created personsa via model..........')
    return applicants;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    // Bulk create items
    const applicants = await db.applicants.bulkCreate(applicantsData, {
      transaction,
    });

    // For each item created, replace relation files

    return applicants;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const applicants = await db.applicants.findByPk(id, {
      transaction,
    });

    await applicants.update(applicantsData,{ transaction }, );

    return applicants;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const applicants = await db.applicants.findByPk(id, options);

    await applicants.update({deletedBy: currentUser.id,}, { transaction, }, );

    await applicants.destroy({ transaction,});

    return applicants;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const applicants = await db.applicants.findOne({ where }, { transaction });

    if (!applicants) {
      return applicants;
    }

    const output = applicants.get({ plain: true });

   
    // output.created_by_user = await applicants.getCreated_by_user({
    //   transaction,
    // });

    // output.modified_by_user = await applicants.getModified_by_user({
    //   transaction,
    // });
console.log('---------- applicants.js api - 113'+JSON.stringify(where));
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
          [Op.and]: Utils.ilike('applicants', 'name', filter.name),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('applicants', 'description', filter.description),
        };
      }
      console.log('------------- line 201 '+JSON.stringify(where));
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
      console.log('------------- line 345 '+JSON.stringify(where));
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
      console.log('------------- line 357  '+JSON.stringify(where));
      if (filter.created_by_user) {
        var listItems = filter.created_by_user.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          created_by_userId: { [Op.or]: listItems },
        };
      }
      console.log('------------- line 368 '+JSON.stringify(where));
      if (filter.modified_by_user) {
        var listItems = filter.modified_by_user.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          modified_by_userId: { [Op.or]: listItems },
        };
      }
      console.log('------------- line 379 '+JSON.stringify(where));

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
        console.log('------------- line 392 '+JSON.stringify(where));

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
console.log('------------- line 403 '+JSON.stringify(where));
    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.applicants.count({
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
          },
          console.log('------------- line 422 '+JSON.stringify(where))
          ),
        }
      : await db.applicants.findAndCountAll({
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
        },
        console.log('------------- line 435 '+JSON.stringify(where))
        );

      //  rows = await this._fillWithRelationsAndFilesForRows(
      //    rows,
      //    options,
      //  );
      console.log('------------- line 440 '+count);

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};
    console.log('------------- line 447 '+JSON.stringify(query));

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('applicants', 'id', query),
        ],
      };
    }

    const records = await db.applicants.findAll({
      attributes: ['id', 'id'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['id', 'ASC']],
    },
    console.log('------------- line 464 '+JSON.stringify(include))
    );

    return records.map((record) => ({
      id: record.id,
      label: record.id,
    }));
  }
};

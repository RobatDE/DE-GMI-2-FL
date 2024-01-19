const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const bcrypt = require('bcrypt');
const config = require('../../config');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class PersonasDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    personasData = data.map((data) => ({
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
  
    const personas = await db.personas.create({personasData},{ transaction },);

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.personas.getTableName(),
        belongsToColumn: 'avatar',
        belongsToId: personas.id,
      },
      data.data.avatar,
      options,
    );

    return personas;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    personasData = data.map((data) => ({
      id: data.id || undefined,
      Name: data.Name || null,
      Description: data.Description || null,
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

    // Bulk create items
    const personas = await db.personas.bulkCreate(personasData, { transaction });

    // For each item created, replace relation files

    for (let i = 0; i < personas.length; i++) {
      await FileDBApi.replaceRelationFiles(
        {
          belongsTo: db.personas.getTableName(),
          belongsToColumn: 'avatar',
          belongsToId: personas[i].id,
        },
        data[i].avatar,
        options,
      );
    }

    return personas;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
console.log('-------------------------  inside update:'+JSON.stringify(data));
    const personas = await db.personas.findByPk(id, { transaction, });

    await personas.update(
      {
        Name: data.Name || null,
        Description: data.Description || null,
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
      },
      { transaction },
    );

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.personas.getTableName(),
        belongsToColumn: 'avatar',
        belongsToId: personas.id,
      },
      data.avatar,
      options,
    );

    return personas;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const personas = await db.personas.findByPk(id, options);

    await personas.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await personas.destroy({
      transaction,
    });

    return personas;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const personas = await db.personas.findOne({ where }, { transaction });

    if (!personas) {
      return personas;
    }

    const output = personas.get({ plain: true });

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
        model: db.file,
        as: 'avatar',
      },
    ];

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.personas.count({
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
      : await db.personas.findAndCountAll({
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
          Utils.ilike('personas', 'Name', query),
        ],
      };
    }

    const records = await db.personas.findAll({
      attributes: ['id', 'Name'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['Name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.Name,
    }));
  }

  static async createFromAuth(data, options) {
    const transaction = (options && options.transaction) || undefined;
    const personas = await db.personas.create(
      {
        email: data.email,
        Name: data.Name,
        authenticationUid: data.authenticationUid,
        password: data.password,
      },
      { transaction },
    );

    await personas.update(
      {
        authenticationUid: personas.id,
      },
      { transaction },
    );

    delete personas.password;
    return personas;
  }


  static async _generateToken(keyNames, email, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const personas = await db.personas.findOne(
      {
        where: { email: email.toLowerCase() },
      },
      {
        transaction,
      },
    );

    const token = crypto.randomBytes(20).toString('hex');
    const tokenExpiresAt = Date.now() + 360000;

    if (personas) {
      await personas.update(
        {
          [keyNames[0]]: token,
          [keyNames[1]]: tokenExpiresAt,
          updatedById: currentUser.id,
        },
        { transaction },
      );
    }

    return token;
  }
};

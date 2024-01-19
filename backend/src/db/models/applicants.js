const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const Applicants = sequelize.define('Applicants', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      FirstName: DataTypes.STRING,
      MiddleName: DataTypes.STRING,
      LastName: DataTypes.STRING,
      Description: DataTypes.STRING,
      Gender: DataTypes.STRING,
      GenderIdentity: DataTypes.STRING,
      Occupation: DataTypes.STRING,
      Industry: DataTypes.STRING,
      EducationLevel: DataTypes.STRING,
      IncomeRange: DataTypes.STRING,
      Age: DataTypes.INTEGER,
      MaritalStatus: DataTypes.STRING,
      EmploymentType: DataTypes.STRING,
      HouseholdComposition: DataTypes.STRING,
      Income: DataTypes.INTEGER,
      Religion: DataTypes.STRING,
      Nationality: DataTypes.STRING,
      Geography: DataTypes.STRING,
      Ethnicity: DataTypes.STRING,
      Languages: DataTypes.JSON,
      AssociationsDetails: DataTypes.JSON,
      PersonalityDetails: DataTypes.JSON,
      PositionDetails: DataTypes.JSON,
      CommunicationsDetails: DataTypes.JSON,
      CertificationsDetails: DataTypes.JSON,
    }, {});
    // Applicants.associate = function(models) {
    //   // associations can be defined here
    //   Applicants.hasMany(models.PersonaBehaviors, { foreignKey: 'PersonaID' });
    //   Applicants.hasMany(models.PersonaNeeds, { foreignKey: 'PersonaID' });
    //   Applicants.hasMany(models.PersonaGoals, { foreignKey: 'PersonaID' });
    // };
    Applicants.associate = (db) => {
      /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity
      db.Applicants.hasMany(db.file, {
        as: 'avatar',
        foreignKey: 'belongsToId',
        constraints: false,
        scope: {
          belongsTo: db.Applicants.getTableName(),
          belongsToColumn: 'avatar',
        },
      });
  }    
    return Applicants;
  };
  
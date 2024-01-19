const config = require('../../config');

module.exports = (sequelize, DataTypes) => {
    const Personas = sequelize.define('personas', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Name: DataTypes.STRING,
      Description: DataTypes.STRING,
      Gender: DataTypes.STRING,
      GenderIdentity: DataTypes.STRING,
      Occupation: DataTypes.STRING,
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
      Race: DataTypes.STRING,
      Language: DataTypes.STRING,
      PoliticalAffiliation: DataTypes.STRING,
      HomeOwnership: DataTypes.STRING,
      PersonalityDetails: DataTypes.JSON,
      PositionDetails: DataTypes.JSON,
      CommunicationsDetails: DataTypes.JSON,
      MotivationsDetails: DataTypes.JSON,
    }, {});
    // Personas.associate = function(models) {
    //   // associations can be defined here
    //   Personas.hasMany(models.PersonaBehaviors, { foreignKey: 'PersonaID' });
    //   Personas.hasMany(models.PersonaNeeds, { foreignKey: 'PersonaID' });
    //   Personas.hasMany(models.PersonaGoals, { foreignKey: 'PersonaID' });
    // };
    Personas.associate = (db) => {
      /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity
      console.log('-------------------------- db-models-personas: '+db.personas.getTableName());
      db.personas.hasMany(db.file, {
        as: 'avatar',
        foreignKey: 'belongsToId',
        constraints: false,
        scope: {
          belongsTo: db.personas.getTableName(),
          belongsToColumn: 'avatar',
        },
      });
      console.log('--------------------------57 db-models-personas: '+JSON.stringify(db.personas));

    }    
    return Personas;
  };
  
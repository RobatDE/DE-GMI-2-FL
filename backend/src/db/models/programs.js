const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const programs = sequelize.define(
    'programs',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      date_added: {
        type: DataTypes.DATE,
      },

      date_modified: {
        type: DataTypes.DATE,
      },

      name: {
        type: DataTypes.TEXT,
      },

      description: {
        type: DataTypes.TEXT,
      },

      goal: {
        type: DataTypes.TEXT,
      },

      start_date: {
        type: DataTypes.DATE,
      },

      end_date: {
        type: DataTypes.DATE,
      },

      allow_restart: {
        type: DataTypes.INTEGER,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  programs.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.programs.hasMany(db.campaigns, {
      as: 'campaigns_program',
      foreignKey: {
        name: 'programId',
      },
      constraints: false,
    });

    db.programs.hasMany(db.promptresponses, {
      as: 'promptresponses_program',
      foreignKey: {
        name: 'programId',
      },
      constraints: false,
    });

    //end loop

    db.programs.belongsTo(db.companies, {
      as: 'company',
      foreignKey: {
        name: 'companyId',
      },
      constraints: false,
    });

    db.programs.belongsTo(db.users, {
      as: 'created_by_user',
      foreignKey: {
        name: 'created_by_userId',
      },
      constraints: false,
    });

    db.programs.belongsTo(db.users, {
      as: 'modified_by_user',
      foreignKey: {
        name: 'modified_by_userId',
      },
      constraints: false,
    });

    db.programs.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.programs.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return programs;
};

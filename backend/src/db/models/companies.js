const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const companies = sequelize.define(
    'companies',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      is_published: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,
      },

      date_added: {
        type: DataTypes.DATE,
      },

      date_modified: {
        type: DataTypes.DATE,
      },

      checked_out: {
        type: DataTypes.DATE,
      },

      checked_out_by: {
        type: DataTypes.INTEGER,
      },

      social_cache: {
        type: DataTypes.TEXT,
      },

      score: {
        type: DataTypes.INTEGER,
      },

      companyemail: {
        type: DataTypes.TEXT,
      },

      companyaddress1: {
        type: DataTypes.TEXT,
      },

      companyaddress2: {
        type: DataTypes.TEXT,
      },

      companyphone: {
        type: DataTypes.TEXT,
      },

      companycity: {
        type: DataTypes.TEXT,
      },

      companystate: {
        type: DataTypes.TEXT,
      },

      companyzipcode: {
        type: DataTypes.TEXT,
      },

      companycountry: {
        type: DataTypes.TEXT,
      },

      companyname: {
        type: DataTypes.TEXT,
      },

      companywebsite: {
        type: DataTypes.TEXT,
      },

      companyindustry: {
        type: DataTypes.TEXT,
      },

      companydescription: {
        type: DataTypes.TEXT,
      },

      companynumber_of_employees: {
        type: DataTypes.INTEGER,
      },

      companyfax: {
        type: DataTypes.TEXT,
      },

      companyannual_revenue: {
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

  companies.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.companies.hasMany(db.programs, {
      as: 'programs_company',
      foreignKey: {
        name: 'companyId',
      },
      constraints: false,
    });

    db.companies.hasMany(db.markets, {
      as: 'markets_company',
      foreignKey: {
        name: 'companyId',
      },
      constraints: false,
    });

    db.companies.hasMany(db.opportunities, {
      as: 'opportunities_company',
      foreignKey: {
        name: 'companyId',
      },
      constraints: false,
    });

    //end loop

    db.companies.belongsTo(db.users, {
      as: 'owner',
      foreignKey: {
        name: 'ownerId',
      },
      constraints: false,
    });

    db.companies.belongsTo(db.users, {
      as: 'created_by_user',
      foreignKey: {
        name: 'created_by_userId',
      },
      constraints: false,
    });

    db.companies.belongsTo(db.users, {
      as: 'modified_by_user',
      foreignKey: {
        name: 'modified_by_userId',
      },
      constraints: false,
    });

    db.companies.belongsTo(db.users, {
      as: 'checked_out_by_user',
      foreignKey: {
        name: 'checked_out_by_userId',
      },
      constraints: false,
    });

    db.companies.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.companies.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return companies;
};

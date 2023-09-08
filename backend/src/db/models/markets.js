const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const markets = sequelize.define(
    'markets',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      segment: {
        type: DataTypes.TEXT,
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

  markets.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.markets.hasMany(db.opportunities, {
      as: 'opportunities_market',
      foreignKey: {
        name: 'marketId',
      },
      constraints: false,
    });

    //end loop

    db.markets.belongsTo(db.companies, {
      as: 'company',
      foreignKey: {
        name: 'companyId',
      },
      constraints: false,
    });

    db.markets.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.markets.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return markets;
};

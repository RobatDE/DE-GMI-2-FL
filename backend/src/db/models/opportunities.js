const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const opportunities = sequelize.define(
    'opportunities',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      public_on: {
        type: DataTypes.DATE,
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

  opportunities.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.opportunities.belongsTo(db.companies, {
      as: 'company',
      foreignKey: {
        name: 'companyId',
      },
      constraints: false,
    });

    db.opportunities.belongsTo(db.markets, {
      as: 'market',
      foreignKey: {
        name: 'marketId',
      },
      constraints: false,
    });

    db.opportunities.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.opportunities.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return opportunities;
};

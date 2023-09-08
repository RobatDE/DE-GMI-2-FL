const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const campaigns = sequelize.define(
    'campaigns',
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

      name: {
        type: DataTypes.TEXT,
      },

      description: {
        type: DataTypes.TEXT,
      },

      publish_up: {
        type: DataTypes.DATE,
      },

      publish_down: {
        type: DataTypes.DATE,
      },

      canvas_settings: {
        type: DataTypes.TEXT,
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

  campaigns.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.campaigns.hasMany(db.projects, {
      as: 'projects_campaing',
      foreignKey: {
        name: 'campaingId',
      },
      constraints: false,
    });

    //end loop

    db.campaigns.belongsTo(db.programs, {
      as: 'program',
      foreignKey: {
        name: 'programId',
      },
      constraints: false,
    });

    db.campaigns.belongsTo(db.users, {
      as: 'created_by_user',
      foreignKey: {
        name: 'created_by_userId',
      },
      constraints: false,
    });

    db.campaigns.belongsTo(db.users, {
      as: 'modified_by_user',
      foreignKey: {
        name: 'modified_by_userId',
      },
      constraints: false,
    });

    db.campaigns.belongsTo(db.users, {
      as: 'checked_out_by_user',
      foreignKey: {
        name: 'checked_out_by_userId',
      },
      constraints: false,
    });

    db.campaigns.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.campaigns.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return campaigns;
};

const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const channels = sequelize.define(
    'channels',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      redirect_id: {
        type: DataTypes.INTEGER,
      },

      channel: {
        type: DataTypes.TEXT,
      },

      content: {
        type: DataTypes.TEXT,
      },

      hits: {
        type: DataTypes.INTEGER,
      },

      unique_hits: {
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

  channels.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.channels.belongsTo(db.projects, {
      as: 'project',
      foreignKey: {
        name: 'projectId',
      },
      constraints: false,
    });

    db.channels.belongsTo(db.events, {
      as: 'event',
      foreignKey: {
        name: 'eventId',
      },
      constraints: false,
    });

    db.channels.belongsTo(db.users, {
      as: 'owner',
      foreignKey: {
        name: 'ownerId',
      },
      constraints: false,
    });

    db.channels.belongsTo(db.channels, {
      as: 'redirect',
      foreignKey: {
        name: 'redirectId',
      },
      constraints: false,
    });

    db.channels.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.channels.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return channels;
};

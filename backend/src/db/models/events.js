const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const events = sequelize.define(
    'events',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      description: {
        type: DataTypes.TEXT,
      },

      event_type: {
        type: DataTypes.TEXT,
      },

      event_order: {
        type: DataTypes.INTEGER,
      },

      properties: {
        type: DataTypes.TEXT,
      },

      trigger_date: {
        type: DataTypes.DATE,
      },

      trigger_interval: {
        type: DataTypes.INTEGER,
      },

      trigger_interval_unit: {
        type: DataTypes.TEXT,
      },

      trigger_hour: {
        type: DataTypes.DATE,
      },

      trigger_restricted_start_hour: {
        type: DataTypes.DATE,
      },

      trigger_restricted_stop_hour: {
        type: DataTypes.DATE,
      },

      trigger_restricted_dow: {
        type: DataTypes.TEXT,
      },

      trigger_mode: {
        type: DataTypes.TEXT,
      },

      decision_path: {
        type: DataTypes.TEXT,
      },

      temp_id: {
        type: DataTypes.TEXT,
      },

      channel: {
        type: DataTypes.TEXT,
      },

      channel_id: {
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

  events.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.events.hasMany(db.channels, {
      as: 'channels_event',
      foreignKey: {
        name: 'eventId',
      },
      constraints: false,
    });

    //end loop

    db.events.belongsTo(db.projects, {
      as: 'project',
      foreignKey: {
        name: 'projectId',
      },
      constraints: false,
    });

    db.events.belongsTo(db.events, {
      as: 'event',
      foreignKey: {
        name: 'eventId',
      },
      constraints: false,
    });

    db.events.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.events.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return events;
};

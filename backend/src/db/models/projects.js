const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const projects = sequelize.define(
    'projects',
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

      date_added: {
        type: DataTypes.DATE,
      },

      date_modified: {
        type: DataTypes.DATE,
      },

      modified_by: {
        type: DataTypes.INTEGER,
      },

      public_on: {
        type: DataTypes.DATE,
      },

      start_on: {
        type: DataTypes.DATE,
      },

      end_on: {
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

  projects.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.projects.hasMany(db.assets, {
      as: 'assets_project',
      foreignKey: {
        name: 'projectId',
      },
      constraints: false,
    });

    db.projects.hasMany(db.categories, {
      as: 'categories_project',
      foreignKey: {
        name: 'projectId',
      },
      constraints: false,
    });

    db.projects.hasMany(db.channels, {
      as: 'channels_project',
      foreignKey: {
        name: 'projectId',
      },
      constraints: false,
    });

    db.projects.hasMany(db.events, {
      as: 'events_project',
      foreignKey: {
        name: 'projectId',
      },
      constraints: false,
    });

    db.projects.hasMany(db.tasks, {
      as: 'tasks_project',
      foreignKey: {
        name: 'projectId',
      },
      constraints: false,
    });

    db.projects.hasMany(db.teams, {
      as: 'teams_project',
      foreignKey: {
        name: 'projectId',
      },
      constraints: false,
    });

    //end loop

    db.projects.belongsTo(db.campaigns, {
      as: 'campaing',
      foreignKey: {
        name: 'campaingId',
      },
      constraints: false,
    });

    db.projects.belongsTo(db.teams, {
      as: 'team',
      foreignKey: {
        name: 'teamId',
      },
      constraints: false,
    });

    db.projects.belongsTo(db.users, {
      as: 'created_by_user',
      foreignKey: {
        name: 'created_by_userId',
      },
      constraints: false,
    });

    db.projects.belongsTo(db.users, {
      as: 'modified_by_user',
      foreignKey: {
        name: 'modified_by_userId',
      },
      constraints: false,
    });

    db.projects.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.projects.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return projects;
};

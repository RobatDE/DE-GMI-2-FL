const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const tasks = sequelize.define(
    'tasks',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      title: {
        type: DataTypes.TEXT,
      },

      content: {
        type: DataTypes.TEXT,
      },

      starttime: {
        type: DataTypes.DATE,
      },

      priority: {
        type: DataTypes.INTEGER,
      },

      status: {
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

  tasks.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.tasks.belongsTo(db.team_members, {
      as: 'team_member',
      foreignKey: {
        name: 'team_memberId',
      },
      constraints: false,
    });

    db.tasks.belongsTo(db.projects, {
      as: 'project',
      foreignKey: {
        name: 'projectId',
      },
      constraints: false,
    });

    db.tasks.belongsTo(db.users, {
      as: 'owner',
      foreignKey: {
        name: 'ownerId',
      },
      constraints: false,
    });

    db.tasks.belongsTo(db.tasks, {
      as: 'task',
      foreignKey: {
        name: 'taskId',
      },
      constraints: false,
    });

    db.tasks.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.tasks.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return tasks;
};

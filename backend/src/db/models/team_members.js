const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const team_members = sequelize.define(
    'team_members',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
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

  team_members.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.team_members.hasMany(db.tasks, {
      as: 'tasks_team_member',
      foreignKey: {
        name: 'team_memberId',
      },
      constraints: false,
    });

    //end loop

    db.team_members.belongsTo(db.teams, {
      as: 'team',
      foreignKey: {
        name: 'teamId',
      },
      constraints: false,
    });

    db.team_members.belongsTo(db.users, {
      as: 'user',
      foreignKey: {
        name: 'userId',
      },
      constraints: false,
    });

    db.team_members.belongsTo(db.organizations, {
      as: 'organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.team_members.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.team_members.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return team_members;
};

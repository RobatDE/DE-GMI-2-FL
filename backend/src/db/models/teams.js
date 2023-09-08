const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const teams = sequelize.define(
    'teams',
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

  teams.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.teams.hasMany(db.projects, {
      as: 'projects_team',
      foreignKey: {
        name: 'teamId',
      },
      constraints: false,
    });

    db.teams.hasMany(db.team_members, {
      as: 'team_members_team',
      foreignKey: {
        name: 'teamId',
      },
      constraints: false,
    });

    //end loop

    db.teams.belongsTo(db.projects, {
      as: 'project',
      foreignKey: {
        name: 'projectId',
      },
      constraints: false,
    });

    db.teams.belongsTo(db.organizations, {
      as: 'organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.teams.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.teams.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return teams;
};

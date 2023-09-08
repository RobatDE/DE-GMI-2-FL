const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const prompts = sequelize.define(
    'prompts',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      prompt: {
        type: DataTypes.TEXT,
      },

      jsonprompt: {
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

  prompts.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.prompts.hasMany(db.promptresponses, {
      as: 'promptresponses_prompt_id',
      foreignKey: {
        name: 'prompt_idId',
      },
      constraints: false,
    });

    //end loop

    db.prompts.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.prompts.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return prompts;
};

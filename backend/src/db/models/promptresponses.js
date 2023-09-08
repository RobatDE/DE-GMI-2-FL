const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const promptresponses = sequelize.define(
    'promptresponses',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      engine: {
        type: DataTypes.TEXT,
      },

      model: {
        type: DataTypes.TEXT,
      },

      prompt: {
        type: DataTypes.TEXT,
      },

      response: {
        type: DataTypes.TEXT,
      },

      jsonprompt: {
        type: DataTypes.TEXT,
      },

      jsonresponse: {
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

  promptresponses.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.promptresponses.belongsTo(db.programs, {
      as: 'program',
      foreignKey: {
        name: 'programId',
      },
      constraints: false,
    });

    db.promptresponses.belongsTo(db.prompts, {
      as: 'prompt_id',
      foreignKey: {
        name: 'prompt_idId',
      },
      constraints: false,
    });

    db.promptresponses.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.promptresponses.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return promptresponses;
};

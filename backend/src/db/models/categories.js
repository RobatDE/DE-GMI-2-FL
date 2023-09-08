const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const categories = sequelize.define(
    'categories',
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

      title: {
        type: DataTypes.TEXT,
      },

      description: {
        type: DataTypes.TEXT,
      },

      alias: {
        type: DataTypes.TEXT,
      },

      color: {
        type: DataTypes.TEXT,
      },

      bundle: {
        type: DataTypes.TEXT,
      },

      checked_out_by: {
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

  categories.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.categories.hasMany(db.assets, {
      as: 'assets_category',
      foreignKey: {
        name: 'categoryId',
      },
      constraints: false,
    });

    //end loop

    db.categories.belongsTo(db.users, {
      as: 'created_by_user',
      foreignKey: {
        name: 'created_by_userId',
      },
      constraints: false,
    });

    db.categories.belongsTo(db.users, {
      as: 'modified_by_user',
      foreignKey: {
        name: 'modified_by_userId',
      },
      constraints: false,
    });

    db.categories.belongsTo(db.users, {
      as: 'checked_out_by_user',
      foreignKey: {
        name: 'checked_out_by_userId',
      },
      constraints: false,
    });

    db.categories.belongsTo(db.projects, {
      as: 'project',
      foreignKey: {
        name: 'projectId',
      },
      constraints: false,
    });

    db.categories.belongsTo(db.categories, {
      as: 'category',
      foreignKey: {
        name: 'categoryId',
      },
      constraints: false,
    });

    db.categories.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.categories.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return categories;
};

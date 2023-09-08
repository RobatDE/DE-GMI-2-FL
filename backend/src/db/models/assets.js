const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const assets = sequelize.define(
    'assets',
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

      storage_location: {
        type: DataTypes.TEXT,
      },

      path: {
        type: DataTypes.TEXT,
      },

      url: {
        type: DataTypes.TEXT,
      },

      remote_path: {
        type: DataTypes.TEXT,
      },

      original_file_name: {
        type: DataTypes.TEXT,
      },

      lang: {
        type: DataTypes.TEXT,
      },

      publish_up: {
        type: DataTypes.DATE,
      },

      publish_down: {
        type: DataTypes.DATE,
      },

      download_count: {
        type: DataTypes.INTEGER,
      },

      unique_download_count: {
        type: DataTypes.INTEGER,
      },

      revision: {
        type: DataTypes.INTEGER,
      },

      extension: {
        type: DataTypes.TEXT,
      },

      mime: {
        type: DataTypes.TEXT,
      },

      size: {
        type: DataTypes.INTEGER,
      },

      disallow: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,
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

  assets.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.assets.belongsTo(db.projects, {
      as: 'project',
      foreignKey: {
        name: 'projectId',
      },
      constraints: false,
    });

    db.assets.belongsTo(db.categories, {
      as: 'category',
      foreignKey: {
        name: 'categoryId',
      },
      constraints: false,
    });

    db.assets.belongsTo(db.users, {
      as: 'created_by_user',
      foreignKey: {
        name: 'created_by_userId',
      },
      constraints: false,
    });

    db.assets.belongsTo(db.users, {
      as: 'checked_out_by_user',
      foreignKey: {
        name: 'checked_out_by_userId',
      },
      constraints: false,
    });

    db.assets.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.assets.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return assets;
};

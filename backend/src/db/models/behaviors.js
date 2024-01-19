const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const Behaviors = sequelize.define('behaviors', {
      BehaviorID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Description: DataTypes.STRING
    }, {});
    return Behaviors;
  };
  
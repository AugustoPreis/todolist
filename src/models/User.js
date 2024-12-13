const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database/database');

const User = sequelize.define('users', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  name: {
    type: DataTypes.STRING(50),
  },

  email: {
    type: DataTypes.STRING(100),
  },

  password: {
    type: DataTypes.TEXT,
  },

}, {
  timestamps: false,
});

module.exports = { User };
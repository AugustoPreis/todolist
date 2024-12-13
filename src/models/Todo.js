const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database/database');
const { User } = require('./User');

const Todo = sequelize.define('todos', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  title: {
    type: DataTypes.STRING(50),
  },

  description: {
    type: DataTypes.STRING(250),
  },

  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
  },

}, {
  timestamps: false,
  defaultScope: {
    attributes: {
      exclude: ['user_id'],
    },
  },
});

//user_id FK
User.hasMany(Todo, { foreignKey: 'user_id', as: 'todos' });
Todo.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = { Todo };
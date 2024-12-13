const { Sequelize } = require('sequelize');
const { getEnvConfig } = require('../dotenv');

const config = getEnvConfig();

const sequelize = new Sequelize({
  dialect: 'postgres',
  logging: false,
  host: config.db.host,
  port: config.db.port,
  database: config.db.database,
  username: config.db.username,
  password: config.db.password,
});

module.exports = { sequelize };
require('dotenv/config');

const { init } = require('./server');
const { sequelize } = require('./config/database/database');

//Only start the server if database is connected
sequelize.authenticate().then(() => {
  init();
});
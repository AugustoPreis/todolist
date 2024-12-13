const express = require('express');
const bodyParser = require('body-parser');
const { version } = require('../package.json');
const { errorHandler } = require('./middlewares/errorHandler');
const { getEnvConfig } = require('./config/dotenv');
const { routes } = require('./routes/routes');

function init() {
  const config = getEnvConfig();
  const app = express();

  //Parse the request body into req.body
  app.use(bodyParser.json());

  //System routes
  app.use(routes);

  //Handler for errors
  app.use(errorHandler);

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}, v${version}`);
  });

  return app;
}

module.exports = { init };
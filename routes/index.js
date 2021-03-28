const apiRoutes = require('./API/v1');

module.exports = app => {
  app.use('/API/v1', apiRoutes);
};
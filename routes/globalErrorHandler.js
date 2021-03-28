const createError = require('http-errors');

module.exports = app => {
// catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404));
  });

// global error handler
  app.use((err, req, res) => {
    console.log(err);
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({ error: err.message });
  });
};
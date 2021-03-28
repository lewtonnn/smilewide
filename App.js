require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

const app = express();

// connect database
connectDB();

// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
require('./routes')(app);

// global error handler
require('./routes/globalErrorHandler')(app);

// start the server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
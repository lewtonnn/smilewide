require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;
const ash = require('../helpers/asyncHandler');

const connectDB = ash(async () => {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  console.log('Mongo connected');
});

module.exports = connectDB;
const mongoose = require('mongoose');
const dbURI = 'mongodb://127.0.0.1:27017/todoAppV1';

const establishDBConnection = async function () {
  try {
    await mongoose.connect(dbURI);
    console.log('Database connection established successfully :)');
  } catch (err) {
    console.log(err);
  }
};

establishDBConnection();

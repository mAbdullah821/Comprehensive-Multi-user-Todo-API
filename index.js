const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser')

const PORT = 3000;
const dbURI = 'mongodb://127.0.0.1:27017/todoAppV1';
const app = express();

// app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

const establishDBConnection = async function () {
  await mongoose.connect(dbURI);
  console.log('Database connection established successfully :)');
};

app.use((err, req, res, next) => {
  res.status(404).send({ error: err.message });
});

app.listen(PORT, (err) => {
  console.log(`Server is listening on port ${PORT} :)`);
  establishDBConnection().catch((err) => console.log(err));
});

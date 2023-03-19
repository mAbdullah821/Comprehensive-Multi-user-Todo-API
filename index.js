const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRouter = require('./routers/user');
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

app.use('/users', userRouter);

app.use((err, req, res, next) => {
  res.status(401).send(handleErrors(err));
});

app.use((req, res) => {
  res.status(404).send(`Can't find this endpoint: ${req.method} ${req.path}`);
});

app.listen(PORT, (err) => {
  console.log(`Server is listening on port ${PORT} :)`);
  establishDBConnection().catch((err) => console.log(err));
});

const handleErrors = function (err) {
  // console.log(err.errors);
  let errors = err.message;
  if (err.message.startsWith('User validation failed'))
    errors = Object.values(err.errors).map(({ message }) => message);
  if (err.code === 11000) errors = ['That <username> is already registered'];
  console.log(err.code);
  return { errors };
};

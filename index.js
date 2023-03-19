const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const userRouter = require('./routers/user');

const PORT = 3000;
const dbURI = 'mongodb://127.0.0.1:27017/todoAppV1';
const app = express();

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;
app.use(express.json());
app.use(
  session({
    name: 'userId',
    secret: 'simple-secret-for-now',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
  })
);

function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    return next();
  }
  next(new Error('Please login first'));
}

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
  // console.log(err);
  return { errors };
};

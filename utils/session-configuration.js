const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

const client = mongoose.connection.getClient();
// creating 24 hours from milliseconds
const oneDay = 24 * 60 * 60 * 1000;

const sessionOptions = {
  name: 'userId',
  secret: 'simple-secret-for-now',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: oneDay, httpOnly: true, sameSite: 'lax' },
  store: MongoStore.create({
    client: client,
    collectionName: 'sessions',
    autoRemove: 'interval',
    autoRemoveInterval: 10,
    touchAfter: 24 * 60 * 60, // time period in seconds
    stringify: true,
  }),
};
module.exports = { sessionOptions };

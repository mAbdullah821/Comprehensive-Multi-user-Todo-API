const { body } = require('express-validator');
const { requiredString } = require('./general');

const username = () =>
  requiredString(body('username'), 'username').toLowerCase();

const password = () =>
  requiredString(body('password'), 'password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters');

const firstName = () =>
  requiredString(body('firstName'), 'firstName')
    .isLength({ min: 3, max: 15 })
    .withMessage(
      'firstName must be at least 3 characters long and at most 15 characters long'
    );

const age = () =>
  body('age')
    .blacklist(' ')
    .isInt({ min: 13 })
    .withMessage('age must be more than or equal to 13')
    .toInt();

module.exports = {
  username,
  password,
  firstName,
  age,
};

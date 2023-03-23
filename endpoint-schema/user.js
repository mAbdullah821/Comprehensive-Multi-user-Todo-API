const schemaValidation = require('./schema-validation');
const { body, oneOf } = require('express-validator');
const User = require('../models/user');
const { id } = require('../input-validator/general');
const {
  username,
  password,
  firstName,
  age,
} = require('../input-validator/user');

const unique = (chain, attribute) => {
  return chain.custom((value) =>
    User.findOne({ [attribute]: value }).then((user) => {
      if (user) {
        throw new Error(`${attribute} already exists`);
      }
    })
  );
};

const registerSchema = [
  unique(username(), 'username'),
  password(),
  firstName(),
  age().optional(),
  schemaValidation,
];
const loginSchema = [username(), password(), schemaValidation];
const deleteUserSchema = [id(), schemaValidation];

const editUserSchema = [
  id(),
  oneOf(
    [
      body('firstName', 'Attribute is not exist').exists(),
      body('password', 'Attribute is not exist').exists(),
      body('age', 'Attribute is not exist').exists(),
    ],
    'You must choose one attribute to edit from: {firstName, password, age}'
  ),
  firstName().optional(),
  password().optional(),
  age().optional(),
  schemaValidation,
];

module.exports = {
  registerSchema,
  loginSchema,
  deleteUserSchema,
  editUserSchema,
};

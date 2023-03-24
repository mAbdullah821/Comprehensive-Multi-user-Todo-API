const schemaValidation = require('./schema-validation');
const { body } = require('express-validator');
const User = require('../models/user');
const { unique, optionalAttributesToEdit } = require('./helperFunctions');
const { id } = require('../input-validator/general');
const {
  username,
  password,
  firstName,
  age,
} = require('../input-validator/user');

const registerSchema = [
  unique(User, username(), 'username'),
  password(),
  firstName(),
  age().optional(),
  schemaValidation,
];

const loginSchema = [username(), password(), schemaValidation];
const deleteUserSchema = [id(), schemaValidation];

const attributes = ['firstName', 'password', 'age'];
const editUserSchema = [
  id(),
  optionalAttributesToEdit(attributes, body),
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

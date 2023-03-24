const {
  title,
  status,
  tagsArray,
  tagsArrayElements,
  skip,
  limit,
} = require('../input-validator/todo');
const { id } = require('../input-validator/general');
const schemaValidation = require('./schema-validation');
const { oneOf, body } = require('express-validator');

const sequentialValidation = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }
    next();
  };
};

const createTodoSchema = [
  title(),
  status(),
  sequentialValidation([tagsArray().optional(), tagsArrayElements()]),
  schemaValidation,
];
const todosPaginationSchema = [skip(), limit(), schemaValidation];

const getTodoByIdSchema = [id(), schemaValidation];

const todosPaginationUsingTagsSchema = [
  skip(),
  limit(),
  sequentialValidation([tagsArray(), tagsArrayElements()]),
  schemaValidation,
];

const msg = 'Attribute is not provided';
const optionalAttributesToEdit = () =>
  oneOf(
    ['title', 'status', 'tags'].map((attribute) =>
      body(attribute, msg).exists()
    ),
    'Provide at least one attribute to edit from: {title, status, tags}'
  );

const editTodoSchema = [
  id(),
  optionalAttributesToEdit(),
  title().optional(),
  status().optional(),
  sequentialValidation([tagsArray().optional(), tagsArrayElements()]),
  schemaValidation,
];

const removeTodoSchema = [id(), schemaValidation];

module.exports = {
  createTodoSchema,
  todosPaginationSchema,
  getTodoByIdSchema,
  todosPaginationUsingTagsSchema,
  removeTodoSchema,
  editTodoSchema,
};

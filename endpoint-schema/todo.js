const {
  title,
  status,
  tagsArray,
  tagsArrayElements,
  skip,
  limit,
} = require('../input-validator/todo');
const { id } = require('../input-validator/general');
const {
  sequentialValidation,
  optionalAttributesToEdit,
} = require('./helperFunctions');
const schemaValidation = require('./schema-validation');
const { body } = require('express-validator');

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

const attributes = ['title', 'status', 'tags'];
const editTodoSchema = [
  id(),
  optionalAttributesToEdit(attributes, body),
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

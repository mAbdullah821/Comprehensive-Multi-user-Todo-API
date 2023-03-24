const { body, query } = require('express-validator');
const { requiredString, defaultIntWithMin } = require('./general');

const title = () =>
  requiredString(body('title'), 'title')
    .isLength({ min: 5, max: 20 })
    .withMessage(
      (value) =>
        `Title must be at least 5 characters long and at most 20 characters long, got ${value.length} characters`
    );

const status = () =>
  requiredString(body('status').default('to-do'), 'status')
    .toLowerCase()
    .isIn(['to-do', 'in progress', 'done'])
    .withMessage('Status must be one value from: {to-do, in progress, done}');

const tagsArray = () =>
  body('tags')
    .exists()
    .withMessage('Provide some tags')
    .isArray({ max: 10 })
    .withMessage((value) => {
      if (Array.isArray(value))
        return `Maximum number of tags is: <10>, got ${value.length} tags`;
      return '<tags>: must be an array of string tags';
    });

const tagsArrayElements = () =>
  body('tags.*')
    .isString()
    .withMessage('tags must be a string')
    .bail()
    .isLength({ min: 1, max: 10 })
    .withMessage(
      (value) =>
        `the tag length must be at least <1> and at most <10> characters long, got ${value.length} characters`
    )
    .bail()
    .toLowerCase();

const skip = () =>
  defaultIntWithMin(query('skip'), 'skip', {
    min: 0,
    defaultValue: 0,
  });

const limit = () =>
  defaultIntWithMin(query('limit'), 'limit', {
    min: 1,
    defaultValue: 10,
  });

module.exports = {
  title,
  status,
  tagsArray,
  tagsArrayElements,
  skip,
  limit,
};

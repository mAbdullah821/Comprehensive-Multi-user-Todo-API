const mongoose = require('mongoose');
const { param } = require('express-validator');

const requiredString = (chain, attribute) =>
  chain
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage(`Required, Provide the <${attribute}> attribute`)
    .bail()
    .isString()
    .withMessage(`${attribute} must be a string`)
    .bail();

const defaultIntWithMin = (chian, attribute, { min, defaultValue }) =>
  chian
    .default(`${defaultValue}`)
    .isInt({ min })
    .withMessage(
      `${attribute}: must be an <integer> value with <${min}> as minimum value`
    )
    .toInt();

const id = () =>
  param('id')
    .custom((value) => {
      const isValid = mongoose.isValidObjectId(value);
      if (!isValid) throw new Error('This is not a valid id, use a valid one');
      return true;
    })
    .bail()
    .customSanitizer((value) => new mongoose.Types.ObjectId(value));

module.exports = {
  id,
  requiredString,
  defaultIntWithMin,
};

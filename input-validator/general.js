const mongoose = require('mongoose');
const { param } = require('express-validator');

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
};

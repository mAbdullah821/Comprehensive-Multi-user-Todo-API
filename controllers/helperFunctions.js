const mongoose = require('mongoose');

const isValidId = (id) => {
  const isValid = mongoose.isValidObjectId(id);
  if (!isValid) throw new Error('This is not a valid id, use a valid one');
};

module.exports = {
  isValidId,
};

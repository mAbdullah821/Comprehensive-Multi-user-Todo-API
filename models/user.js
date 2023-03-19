const mongoose = require('mongoose');
const { strLengthValidator } = require('./validators');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please enter the <username> attribute'],
    unique: true,
    set: (v) => v.toLowerCase(),
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    validate: (firstName) =>
      strLengthValidator(firstName, 'first name', { min: 3, max: 15 }),
  },
  age: {
    type: Number,
    min: [13, 'Minimum age is 13 years old'],
  },
});

const User = new mongoose.model('User', userSchema);
module.exports = User;

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please enter the <username> attribute'],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    minLength: [3, 'First name must be more than or equal <3> characters'],
    maxLength: [3, 'First name must be less than or equal <15> characters'],
  },
  age: {
    type: Number,
    min: [13, 'Minimum age is 13 years old'],
  },
});

const User = new mongoose.model('User', userSchema);
module.exports = User;

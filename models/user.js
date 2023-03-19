const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
    minLength: [6, 'Password must be at least 6 characters'],
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

userSchema.statics.findByCredentials = async function (username, password) {
  const user = await this.find({ username });
  if (!user) throw new Error('Username is not registered');
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Password is not correct');
  return user;
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = new mongoose.model('User', userSchema);
module.exports = User;

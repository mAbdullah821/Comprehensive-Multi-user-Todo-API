const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Todo = require('../models/todo');

router.post('/register', async (req, res, next) => {
  const { username, password, firstName } = req.body;
  try {
    await User.create({ username, password, firstName });
    res.send({ message: 'user was registered successfully' });
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findByCredentials(username, password);

    req.session.regenerate((err) => {
      if (err) throw err;
      req.session.userId = user._id;
      req.session.save((err) => {
        if (err) throw err;
      });
    });

    const { todos } = await user.populate('todos');

    res.send({
      message: 'logged in successfully',
      username: user.username,
      todos,
    });
  } catch (err) {
    next(err);
  }
});

router.post('/logout', (req, res, next) => {
  if (!req.session.userId) throw new Error('You are already logged out');

  req.session.destroy((err) => {
    if (err) return next(err);
    res.send('Logout successfully');
  });
});

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find().select('firstName');
    res.send(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
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

module.exports = router;

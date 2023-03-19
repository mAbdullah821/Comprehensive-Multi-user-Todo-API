const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/register', async (req, res, next) => {
  const { username, password, firstName } = req.body;
  try {
    await User.create({ username, password, firstName });
    res.send({ message: 'user was registered successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

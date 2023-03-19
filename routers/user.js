const express = require('express');
const router = express.Router();
const {
  register,
  login,
  logout,
  getAllUsersFirstName,
  deleteUser,
  editUser,
} = require('../controllers/user');

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

router.get('/', getAllUsersFirstName);

router.delete('/:id', deleteUser);

router.patch('/:id', editUser);

module.exports = router;

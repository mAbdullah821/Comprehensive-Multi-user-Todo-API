const express = require('express');
const router = express.Router();
const {
  registerSchema,
  loginSchema,
  deleteUserSchema,
  editUserSchema,
} = require('../endpoint-schema/user');

const {
  register,
  login,
  logout,
  getAllUsersFirstName,
  deleteUser,
  editUser,
} = require('../controllers/user');

router.post('/register', registerSchema, register);

router.post('/login', loginSchema, login);

router.post('/logout', logout);

router.get('/', getAllUsersFirstName);

router.delete('/:id', deleteUserSchema, deleteUser);

router.patch('/:id', editUserSchema, editUser);

module.exports = router;

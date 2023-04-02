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

const {
  isAuthenticated,
  addCreateSessionToReq,
} = require('../authentication/session');

router.post('/register', registerSchema, register);

router.post('/login', loginSchema, addCreateSessionToReq, login);

router.use(isAuthenticated); // as a user

// Endpoints for all users
router.post('/logout', logout);

router.patch('/:id', editUserSchema, editUser);

// Endpoints for admin users
router.get('/', getAllUsersFirstName);

router.delete('/:id', deleteUserSchema, deleteUser);

module.exports = router;

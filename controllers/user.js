const User = require('../models/user');
const { isValidId } = require('./helperFunctions');

const register = async (req, res, next) => {
  const { username, password, firstName } = req.body;
  try {
    await User.create({ username, password, firstName });
    res.send({ message: 'user was registered successfully' });
  } catch (err) {
    err.statusCode = 404;
    next(err);
  }
};

const login = async (req, res, next) => {
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
    err.statusCode = 404;
    next(err);
  }
};

const logout = (req, res, next) => {
  try {
    if (!req.session.userId) throw new Error('You are already logged out');

    req.session.destroy((err) => {
      if (err) return next(err);
      res.send({ message: 'Logout successfully' });
    });
  } catch (err) {
    err.statusCode = 404;
    next(err);
  }
};

const getAllUsersFirstName = async (req, res, next) => {
  try {
    const users = await User.find().select('firstName');
    res.send(users);
  } catch (err) {
    err.statusCode = 404;
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    isValidId(id);

    const user = await User.findOneAndDelete({ _id: id });
    if (!user) throw new Error('There is no user with that id');

    res.send({ message: 'User deleted successfully' });
  } catch (err) {
    err.statusCode = 404;
    next(err);
  }
};

const editUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { password, firstName } = req.body;

    isValidId(id);

    if (!password && !firstName)
      throw new Error(
        'Please provide the user attributes to edit, valid attributes: {password, firstName}'
      );

    const user = await User.findOne({ _id: id });

    if (password) user.password = password;
    if (firstName) user.firstName = firstName;
    await user.save();
    const { _id, username } = user;
    res.send({
      message: 'user was edited successfully',
      user: { _id, username, firstName },
    });
  } catch (err) {
    err.statusCode = 404;
    next(err);
  }
};

module.exports = {
  register,
  login,
  logout,
  getAllUsersFirstName,
  deleteUser,
  editUser,
};

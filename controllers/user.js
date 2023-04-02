const User = require('../models/user');

const register = async (req, res, next) => {
  try {
    const { username, password, firstName, age } = req.body;

    await User.create({ username, password, firstName, age });
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

    req.createSession(user.id);

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
    req.logout(res, next);
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
    const { password, firstName, age } = req.body;
    const user = await User.findOne({ _id: id });

    if (password) user.password = password;
    if (firstName) user.firstName = firstName;
    if (age) user.age = age;

    await user.save();

    const { _id, username } = user;
    res.send({
      message: 'user was edited successfully',
      user: { _id, username, firstName, age },
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

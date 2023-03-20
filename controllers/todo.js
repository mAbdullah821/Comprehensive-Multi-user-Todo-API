const mongoose = require('mongoose');
const Todo = require('../models/todo');

const createTodo = async (req, res, next) => {
  try {
    const userId = req.session.userId;
    const { title, tags } = req.body;
    const todo = await Todo.create({ userId, title, tags, status: 'to-do' });
    res.send({ message: 'Todo created successfully', todo });
  } catch (err) {
    err.statusCode = 404;
    next(err);
  }
};

module.exports = {
  createTodo,
};

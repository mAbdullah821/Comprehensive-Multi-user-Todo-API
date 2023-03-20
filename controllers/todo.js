const Todo = require('../models/todo');
const { isValidId } = require('./helperFunctions');

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

const getTodosWithLimit = async (req, res, next) => {
  try {
    const userId = req.session.userId;
    const { skip = '0', limit = '10' } = req.query; // default values [skip = '0'] [limit = '10']
    const todos = await Todo.find({ userId })
      // .sort('createdAt')
      .skip(+skip)
      .limit(+limit);
    res.send(todos);
  } catch (err) {
    err.statusCode = 404;
    next(err);
  }
};

const getTodoById = async (req, res, next) => {
  try {
    const userId = req.session.userId;
    const todoId = req.params.id;

    isValidId(todoId);

    const todo = await Todo.findOne({ _id: todoId, userId });
    res.send(todo);
  } catch (err) {
    err.statusCode = 404;
    next(err);
  }
};

module.exports = {
  createTodo,
  getTodosWithLimit,
  getTodoById,
};

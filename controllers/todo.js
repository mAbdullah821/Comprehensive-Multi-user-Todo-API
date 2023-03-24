const mongoose = require('mongoose');
const Todo = require('../models/todo');

const createTodo = async (req, res, next) => {
  try {
    const userId = req.session.userId;
    const { title, tags, status } = req.body;
    const todo = await Todo.create({ userId, title, tags, status });
    res.send({ message: 'Todo created successfully', todo });
  } catch (err) {
    err.statusCode = 404;
    next(err);
  }
};

const todosPagination = async (req, res, next) => {
  try {
    const userId = req.session.userId;
    const { skip, limit } = req.query; // default values [skip = 0] [limit = 10]
    const todos = await Todo.find({ userId }).skip(skip).limit(limit);
    res.send({ resultsCount: todos.length, todos });
  } catch (err) {
    err.statusCode = 404;
    next(err);
  }
};

const getTodoById = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.session.userId);
    const todoId = req.params.id;

    // isValidId(todoId);

    const todo = await Todo.findOne({ _id: todoId, userId });
    if (!todo)
      throw new Error('There is no Todo with that id, try another one');
    res.send(todo);
  } catch (err) {
    err.statusCode = 404;
    next(err);
  }
};

const todosPaginationUsingTags = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.session.userId);
    const { skip, limit } = req.query;
    const { tags } = req.body;

    const todos = await Todo.todoPaginationByTags({
      userId,
      tags,
      skip,
      limit,
    }); // skip: String (ex. "2") || limit: String (ex. "5")

    res.send({ resultsCount: todos.length, todos });
  } catch (err) {
    err.statusCode = 404;
    next(err);
  }
};

const editTodo = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.session.userId);
    const todoId = req.params.id;
    const { title, status, tags } = req.body;

    let todo = await Todo.findOne({ _id: todoId, userId });

    if (!todo)
      throw new Error('There is no Todo with that id, try another one');

    if (title) todo.title = title;
    if (status) todo.status = status;
    if (tags) todo.tags = tags;

    todo = await todo.save();
    res.send({ message: 'Todo edited successfully', todo });
  } catch (err) {
    err.statusCode = 404;
    next(err);
  }
};

const removeTodo = async (req, res, next) => {
  try {
    const userId = req.session.userId;
    const todoId = req.params.id;

    const todo = await Todo.findOneAndDelete({ _id: todoId, userId });

    if (!todo)
      throw new Error('There is no Todo with that id, try another one');

    res.send({ message: 'Delete a Todo successfully', todo });
  } catch (err) {
    err.statusCode = 404;
    next(err);
  }
};
module.exports = {
  createTodo,
  todosPagination,
  getTodoById,
  todosPaginationUsingTags,
  editTodo,
  removeTodo,
};

const express = require('express');
const router = express.Router();
const {
  createTodo,
  getTodosWithLimit,
  getTodoById,
} = require('../controllers/todo');

router.post('/', createTodo);
router.get('/', getTodosWithLimit);
router.get('/:id', getTodoById);

module.exports = router;

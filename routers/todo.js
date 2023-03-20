const express = require('express');
const router = express.Router();
const {
  createTodo,
  getTodosWithLimit,
  getTodoById,
  getTodosByTags,
} = require('../controllers/todo');

router.post('/', createTodo);
router.get('/', getTodosWithLimit);
router.get('/tags/', getTodosByTags);
router.get('/:id', getTodoById);

module.exports = router;

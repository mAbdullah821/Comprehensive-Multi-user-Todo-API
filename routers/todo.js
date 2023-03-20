const express = require('express');
const router = express.Router();
const {
  createTodo,
  getTodoById,
  todosPagination,
  todosPaginationUsingTags,
  editTodo,
  removeTodo,
} = require('../controllers/todo');

router.post('/', createTodo);
router.get('/', todosPagination);
router.get('/tags/', todosPaginationUsingTags);
router.get('/:id', getTodoById);
router.patch('/:id', editTodo);
router.delete('/:id', removeTodo);

module.exports = router;

const express = require('express');
const router = express.Router();
const {
  createTodo,
  getTodoById,
  todosPagination,
  todosPaginationUsingTags,
  editTodo,
} = require('../controllers/todo');

router.post('/', createTodo);
router.get('/', todosPagination);
router.get('/tags/', todosPaginationUsingTags);
router.get('/:id', getTodoById);
router.patch('/:id', editTodo);

module.exports = router;

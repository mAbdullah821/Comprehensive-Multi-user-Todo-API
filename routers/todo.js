const express = require('express');
const router = express.Router();
const {
  createTodo,
  todosPagination,
  getTodoById,
  todosPaginationUsingTags,
} = require('../controllers/todo');

router.post('/', createTodo);
router.get('/', todosPagination);
router.get('/tags/', todosPaginationUsingTags);
router.get('/:id', getTodoById);

module.exports = router;

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
const {
  createTodoSchema,
  todosPaginationSchema,
  getTodoByIdSchema,
  todosPaginationUsingTagsSchema,
  editTodoSchema,
  removeTodoSchema,
} = require('../endpoint-schema/todo');

router.post('/', createTodoSchema, createTodo);
router.get('/', todosPaginationSchema, todosPagination);
router.get('/tags/', todosPaginationUsingTagsSchema, todosPaginationUsingTags);
router.get('/:id', getTodoByIdSchema, getTodoById);
router.patch('/:id', editTodoSchema, editTodo);
router.delete('/:id', removeTodoSchema, removeTodo);

module.exports = router;

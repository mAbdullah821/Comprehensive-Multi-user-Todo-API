const express = require('express');
const router = express.Router();
const { createTodo, getTodosWithLimit } = require('../controllers/todo');

router.post('/', createTodo);
router.get('/', getTodosWithLimit);

module.exports = router;

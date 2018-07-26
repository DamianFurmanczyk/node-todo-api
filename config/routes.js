const express = require("express");
const router = express.Router();

const todosC = require('./todos.controller.js');

router.get('/', todosC.getTodos);
router.post('/todos', todosC.addTodo);

module.exports = router;
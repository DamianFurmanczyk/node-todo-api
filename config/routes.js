const express = require("express");
const router = express.Router();

const todosC = require('./todos.controller.js');
const usersC = require('./users.controller.js');

router.get('/', todosC.getTodos);
router.post('/todos', todosC.addTodo);

router.post('/user', usersC.signUp);
router.get('/user', usersC.signUpPage);

module.exports = router;
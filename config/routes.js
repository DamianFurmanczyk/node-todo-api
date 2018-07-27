const express = require("express");
const router = express.Router();

const todosC = require('./todos.controller.js');
const usersC = require('./users.controller.js');

router.post('/todos', todosC.addTodo);
router.get('/', todosC.getTodos);

router.post('/user', usersC.signUp);
router.get('/user', usersC.signUpPage);
router.get('/profile', usersC.userInfoPage);

module.exports = router;
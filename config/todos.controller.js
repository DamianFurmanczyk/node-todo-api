const mongoose = require('mongoose');

require('../models/todo');
require('../models/user');

const Todo = mongoose.model('todo');

// post

exports.addTodo = function (req, res) {
    console.log(req.body)
    const todo = new Todo(req.body);
    todo
        .save(req.body)
        .then(todo => res.status(201).json(todo))
        .catch(err => res.status(400).json(err));
};

// get

exports.getTodos = function (req, res) {
    res.render('addTodo');
};
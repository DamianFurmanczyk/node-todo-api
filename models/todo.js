const mongoose = require('mongoose');

const todo_schema = new mongoose.Schema({
    text: {
        type: String,
        required: [
            true, 'Text is required'
        ],
        minlength: 1,
        trim: true
    },
    finished: {
        type: Boolean,
        default: false
    },
    finishedAt: {
        type: Number,
        default: null
    }
});

exports.default = mongoose.model('todo', todo_schema);
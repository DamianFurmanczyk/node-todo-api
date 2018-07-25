const mongoose = require('mongoose');
const {Schema} = mongoose;

const todoSchema = new Schema({
    text: {
        type: String,
        required: [true, 'Todo needs some text']
    },
    finished: {
        type: Boolean
    },
    finishedAt: {
        type: Number
    }
});

exports.default = mongoose.model('todo', todoSchema);
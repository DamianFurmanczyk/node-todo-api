const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
    email: {
        type: String,
        minlength: 1,
        trim: true,
        required: [true, 'Email is required']
    }
});

exports.default = mongoose.model('user', user_schema);
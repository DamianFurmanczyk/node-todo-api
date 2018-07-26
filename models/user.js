const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
require('dotenv/config');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        minlength: 1,
        trim: true,
        required: [
            true, 'You need to specify the email'
        ],
        unique: [
            true, 'Email is already in use'
        ],
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is invalid email'
        }
    },
    password: {
        minlength: 6,
        required: [
            true, 'Password is missing'
        ],
        type: String
    },
    tokens: [
        {
            access: {
                type: String,
                required: true
            }
        }, {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

userSchema.methods.genAuthToken = function () {
    const access = 'auth';

    const authToken = jwt.sign({
        _id: this._id,
        access
    }, process.env.salt_secret);

    this
        .tokens
        .push({access, token: authToken});

    // instead of returning another promise that you could chain with catch or then
    // it returns a plain string to then onto
    return this
        .save()
        .then(() => {
            return authToken;
        });
};

exports.default = mongoose.model('user', userSchema);
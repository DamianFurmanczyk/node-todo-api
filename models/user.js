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

userSchema.statics.findByAuthToken = function (token) {
    const User = this;
    let decoded;

    try {
        decoded = jwt.verify(token, process.env.salt_secret);
    } catch (err) {
        return new Promise((resolve, reject) => {
            reject({msg: 'JsonWebTokenError'});
        });
    }

    // find one - object, find - array obv

    return User.findOne({_id: decoded._id, 'tokens.token': decoded.token, 'tokens.access': decoded.access});
};

userSchema.methods.genAuthToken = function () {
    const access = 'auth';

    const authToken = jwt.sign({
        _id: this._id,
        access
    }, process.env.salt_secret);

    // manipulating instance not whole collection like User.findby...andUpdate, it
    // saves particular user related to the function

    this
        .tokens
        .push({access, token: authToken});

    // instead of returning another promise that you could chain with catch or then
    // it returns a plain string to then onto new token everytime you auth(register,
    // log in) - unique timestamp
    return this
        .save()
        .then(() => {
            return authToken;
        });
};

exports.default = mongoose.model('user', userSchema);
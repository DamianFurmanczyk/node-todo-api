const mongoose = require('mongoose');
require('../models/user');
const User = mongoose.model('user');

exports.signUp = (req, res) => {
    const user = new User(req.body);

    user
        .save()
        .then(doc => {
            user
                .genAuthToken()
                .then(token => {
                    console.log(token);
                    res
                        .header('x-auth', token)
                        .status('201')
                        .json(doc);
                });
        })
        .catch(err => res.status(400).json(err));
};

exports.signUpPage = (req, res) => {
    res.render('signUp');
}
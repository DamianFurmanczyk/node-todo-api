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

// get

exports.userInfoPage = (req, res) => {
    console.log(req.header('x-auth'));
    User
        .findByAuthToken(req.header('x-auth'))
        .then(user => {
            if (!user) {
                console.log('!user');
                return new Promise((resolve, reject) => {
                    reject({msg: 'User not found'});
                });
            }

            let response = {};
            response.msg = 'Authorization succesfull';
            response.user = user;

            return res
                .status(202)
                .send(response);
        })
        .catch(err => {
            res
                .status(401)
                .json(err);
        });
    // 401 - Unauthorized
};

exports.signUpPage = (req, res) => {
    res.render('signUp');
};
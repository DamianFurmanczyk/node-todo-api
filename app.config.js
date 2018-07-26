const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('pug');

const app = express();

const router = require('./config/routes');

app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', router);

const server = app.listen(process.env.PORT || 3000, () => {
    console.log('App running at port: ', server.address().port);
});

exports.default = app;
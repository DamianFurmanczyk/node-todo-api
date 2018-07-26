const mongoose = require('mongoose');
require('dotenv/config');

const db_conn = mongoose.connect(process.env.mongoURI, {useNewUrlParser: true});

db_conn.then(succ => console.log('Connected to database'), err => console.log(`
    failed to connect to db: ${err.message}
    ${JSON.stringify(err, null, 2)}
`));

const app = require('./app.config');

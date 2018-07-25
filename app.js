const {MongoClient} = require('mongodb');
require('dotenv/config');

MongoClient.connect(process.env.mongoURI, {
    useNewUrlParser: true
}, (err, client) => {

    if (err) {
        return console.error(err);
    }

    const db = client.db('todos-api-nodejs');

    db
        .collection('Todos')
        .insertOne({
            text: 'eat eat',
            finished: false
        }, (err, result) => {
            if (err) {
                return console.log('Unable to insert todo ', err);
            }

            console.log(JSON.stringify(result.ops, null, 10));
        });
});
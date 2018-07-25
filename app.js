const mongoose = require('mongoose');

require('dotenv/config');

const db_conn = mongoose.connect(process.env.mongoURI, {useNewUrlParser: true});

db_conn.then(succ => console.log('Connected to database'), err => console.log(`
    failed to connect to db: ${err.message}
    ${JSON.stringify(err, null, 2)}
`));

require('./models/todo');
const todos = mongoose.model('todo');

const newTodo = new todos({text: 'Eat it', finished: false});

todos
    .collection
    .drop();

newTodo
    .save()
    .then(succ => {
        todos
            .find()
            .then(succ => console.log(succ));
    });

todos
    .find()
    .then(succ => console.log(succ));
const mongoose = require('mongoose');
const config = require('../config/index.js');

const host = config.get('database').host;
const username = config.get('database').username;
const password = config.get('database').password;
const dbname = config.get('database').dnname;

let DSN = `mongodb+srv://${username}:${password}@${host}/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(DSN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, err => {
    if(err) {
        return console.log('Could not connect to DB: ', err);
    }
    console.log('MongoDB connected successfully...');
});
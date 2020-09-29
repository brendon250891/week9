const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const databaseName = 'mydb';
MongoClient.connect(url, { poolSize: 10, useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        console.log(error);
    }

    console.log(`Connected successfully to ${databaseName}`);
    const database = client.db(databaseName);

    require('../App/add.js')(database, app);
    require('../App/read.js')(database, app);
    require('../App/update.js')(database, app);
    require('../App/remove.js')(database, app);
});


app.listen(3000, () => {
    let date = new Date();
    console.log(`Server started at ${date.getHours()}:${date.getMinutes()}${date.getHours() > 12 ? 'pm' : 'am'}`);
});

module.exports = app;
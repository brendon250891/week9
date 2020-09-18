const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const databaseName = 'mydb';
const collectionName = 'products';
const client = new MongoClient(url);

client.connect(err => {
    console.log("Connected successfully to server");
    const database = client.db(databaseName);
    const products = db.collection(collectionName);

    require('./add.js')(database, products);
    require('./read.js')(database, products);
    require('./update.js')(database, products);
    require('./remove.js')(database, products);
});
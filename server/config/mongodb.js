const {MongoClient} = require('mongodb');

const connectionURL= 'mongodb://127.0.0.1:27017';
const databaseName = 'api';


const client =  new MongoClient(connectionURL)


client.connect();
const db = client.db(databaseName);
const collection = db.collection('users');



module.exports ={
    collection
}



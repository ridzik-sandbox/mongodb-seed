/* 
Example script to wake up to mongoDB Atlas connection and keep the db alive (for free)
*/

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://simpleappadmin:<PASSWORD>@simpleapp001.ltcno.mongodb.net/simpleCrud?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("simpleCrud").collection("cats");
//   db.collection_name.find().pretty()
  // perform actions on the collection object
  console.log('connected');
  client.close();
});


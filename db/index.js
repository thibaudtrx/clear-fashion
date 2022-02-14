const { MongoClient } = require('mongodb');
const MONGODB_URI = "mongodb+srv://ThibaudTrx:qGHJIC9rjfVMYJqN@cluster0.xsldj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const MONGODB_DB_NAME = 'clear-fashion'
// const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// const db = client.db(MONGODB_DB_NAME)
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();

// });
async function Connect(MONGODB_URI, MONGODB_DB_NAME){
    const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    console.log("Connection Successful");
    const db =  client.db(MONGODB_DB_NAME)
    await client.close();
}

Connect(MONGODB_URI, MONGODB_DB_NAME);
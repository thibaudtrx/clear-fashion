const {MongoClient} = require('mongodb');
const MONGODB_DB_NAME = 'Cluster0';
const MONGODB_COLLECTION = 'products';
const MONGODB_URI = 'mongodb+srv://thibaudtrx:tbcRoZeGgkPysSrx@cluster0.bcgnp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

let client = null;

var adresseP = require('../sites/adresse_products.json');
var dedicated = require('../sites/dedicated_products.json');
var montlimart = require('../sites/montlimart_products.json');
var products = adresseP.concat(dedicated, montlimart);

let db;

async function Connect(){
  console.log('wsh')
  client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
  console.log("Connection Successful");
  db =  await client.db(MONGODB_DB_NAME);
}

async function Close(){
  await client.close();
  console.log("Connection Closed");
}

async function InsertProduct(){ 
  await db.createCollection("products");
  const collection = await db.collection('products');
  //console.log(typeof(products));
  const result = await collection.insertMany(products);
  //console.log(result);
}

async function main(){
  await Connect();
  await InsertProduct();
  await Close();
}

main()
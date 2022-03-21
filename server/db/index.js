require('dotenv').config();
const {MongoClient} = require('mongodb');

const MONGODB_DB_NAME = 'clearfashion';
const MONGODB_COLLECTION = 'products';
const MONGODB_URI = 'mongodb+srv://thibaudtrx:tbcRoZeGgkPysSrx@cluster0.bcgnp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

let client
let db
let database = null;
var adresse_products = require('../sites/adresse_products.json');
var dedicated_products = require('../sites/dedicated_products.json');
var montlimart_products = require('../sites/montlimart_products.json');
var products = adresse_products.concat(dedicated_products,montlimart_products);

/**
 * Get db connection
 * @type {MongoClient}
 */
 module.exports.connect = async (uri = MONGODB_URI, name = MONGODB_DB_NAME) => { 
  console.log("⏳ Connection to MongoDB...");
  client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
  console.log("🎯 Connection Successful");
  db =  client.db(MONGODB_DB_NAME)
}

/**
 * Close the connection
 */
module.exports.close = async () => {
  await client.close();
  console.log('🚨 MongoClient.close...');
};

async function main(){
  await db.connect();
  await db.close();
}
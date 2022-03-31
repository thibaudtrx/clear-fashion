const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const collection = require('./db')

const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': true});
});

app.listen(PORT);

console.log('📡 Running on port ${PORT}');

app.get("/products", async(request, response)=>{
  try{
    //let limit = 12;
    let filter = request.query;
    let sortby = "";
    let products;
    let type="";
    let currentPage = 1;
    let count = 0;
    let category="";
    let order="";
    //console.log(filter);
    if("brand" in filter){
      brand = request.query.brand;
    }
    if("limit" in filter){
      limit = parseInt(request.query.limit);
      delete filter["limit"];
    }
    if("type" in filter){
      type = request.query.type;
    }
    if("order" in filter){
      order = request.query.order;
      delete filter["order"];
    }
    if("category" in filter){
      category = request.query.category;
    }
    if("sortby" in filter){
      sortby = request.query.sortby;
      delete filter["sortby"];
    }
    if("price" in filter){
      filter["price"] = {$lt:parseInt(filter["price"])}
    }
    
    //console.log(filter);
    
    switch(sortby){
      case "price":
        console.log("case 1");
        products = await collection.find(filter);
        products=Array.from(products);
        if(order=="desc"){
          function sort_by_price_desc (marketplace_products) {
            return marketplace_products.sort((a,b)=>parseFloat(b.price)-parseFloat(a.price));
          }
          products = sort_by_price_desc(products);
          
        }
        else{
          function sort_by_price_asc (marketplace_products) {
            return marketplace_products.sort((a,b)=>parseFloat(a.price)-parseFloat(b.price));
          }
          products = sort_by_price_asc(products);
          
        }
        
        break;
      case "name":
        products = await collection.find(filter);
        products=Array.from(products);
        products.sort(function (a, b) {
          if (a.name < b.name) {
              return -1;
          }
          if (b.name < a.name) {
              return 1;
          }
          return 0;
        });

        break;
      case "brand":
        products = await collection.find(filter);
        products=Array.from(products);
        products.sort(function (a, b) {
          if (a.brand < b.brand) {
              return -1;
          }
          if (b.brand < a.brand) {
              return 1;
          }
          return 0;
        });

        break;
      case "type":
        products = await collection.find(filter);
        products=Array.from(products);
        products.sort(function (a, b) {
          if (a.type < b.type) {
              return -1;
          }
          if (b.type < a.type) {
              return 1;
          }
          return 0;
        });

        break;
      default:
        console.log("default");
        products = await collection.find(filter);
    }
    response.send(products);

  } catch (error){
    console.log('error');
    response.status(500).send(error);
  }
  
})


app.get("/products/:id",async (request,response)=>{
  
  try{
    result = await collection.find({"_id":request.params.id})
    response.send(result);
  }
  catch(error){
    response.status(500).send(error);
  }
})
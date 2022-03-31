const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const collection = require('./db')
const { calculateLimitAndOffset, paginate } = require('paginate-info')

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

app.get('/products', async(request, response) => {
  await collection.getDB();

  const filters = request.query;
  const count = await collection.docu();
  const { limit, offset } = calculateLimitAndOffset(parseInt(filters.page), parseInt(filters.size))
  const products = await collection.find(offset,{}, limit);
  const meta = paginate(parseInt(filters.page), count, products, parseInt(filters.size))

  response.send(
    {
      "success" : true, 
      "data" : {
        "result" : products, 
        "meta" : meta
      }
    }
  );
  
});


app.get("/products/:id",async (request,response)=>{
  
  try{
    result = await collection.find({"_id":request.params.id})
    response.send(result);
  }
  catch(error){
    response.status(500).send(error);
  }
})


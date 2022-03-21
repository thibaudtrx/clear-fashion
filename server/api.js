const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const db = require('../db');

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


console.log(`📡 Running on port ${PORT}`);


// For all the products 
async function All()
app.get('/products', async(request, response) => {
  products = await db.findProducts(true)
  response.send({"products" : products});
  console.log('good')
})


async function main(){

  app.listen(PORT);

  await All();
  //await db.close();
}

main();
/* eslint-disable no-console, no-process-exit */
const adresseParis = require('./sources/adresse_paris');
const fetch = require("node-fetch");



async function sandbox (eshop = 'adresse') {
    try {
      console.log(`🕵️‍♀️  browsing ${eshop} source`);
      var products = [];
      switch (eshop){

        case 'adresse':
          const product1 = await adresseParis.scrape("https://adresse.paris/630-toute-la-collection"); //page 1
          const product2 = await adresseParis.scrape("https://adresse.paris/630-toute-la-collection?p=2") //page 2
          products = product1.concat(product2);
          break;
      }
  
      console.log(products);
      console.log(products.length);
      console.log('done');
      process.exit(0);
    } 
    catch (e) {
      console.error(e);
      process.exit(1);
    }
  }

const [,, eshop] = process.argv;

sandbox(eshop);
/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const adresseParis = require('./sources/adresse_paris');
const montlimart = require('./sources/montlimart');
const fetch = require("node-fetch");

//https://adresse.paris/630-toute-la-collection
//https://www.dedicatedbrand.com/en/loadfilter?category=men%2Fnews
//https://www.montlimart.com/toute-la-collection.html


async function sandbox (eshop = 'adresse') {
    try {
      console.log(`🕵️‍♀️  browsing ${eshop} source`);
      var products = [];
      switch (eshop){
          /*
        case "montlimart":
          products = await montlimart.scrape('https://www.montlimart.com/toute-la-collection.html');
          break;
        case 'dedicated':
          const result = await fetch('https://www.dedicatedbrand.com/en/loadfilter?category=men%2Fall-men');
          const x   = await result.json();
          products = x.products;      
          break; */
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
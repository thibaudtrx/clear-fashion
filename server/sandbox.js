/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const adresseParis = require('./sources/adresse_paris');
const montlimart = require('./sources/montlimart');

const fetch = require("node-fetch");
const fs = require('fs');
const {'v5': uuidv5}= require('uuid');
//https://adresse.paris/630-toute-la-collection
//https://www.dedicatedbrand.com/en/loadfilter?category=men%2Fnews
//https://www.montlimart.com/toute-la-collection.html


async function sandbox (eshop = 'dedicated') {
    try {
      console.log('🕵️‍♀️  browsing ${eshop} source');
      var products = [];
      var total= [];
      switch (eshop){
        case "montlimart":
          for (let i = 0; i < 8; i++){
            const prod = await montlimart.scrape('https://www.montlimart.com/toute-la-collection.html?p=' + (i+1));
            products = products.concat(prod);
          }
          total = JSON.stringify(products, null, 2);
          fs.writeFileSync('sites/montlimart_products.json', total);   
          break;

        case 'dedicated':
          const result = await fetch('https://www.dedicatedbrand.com/en/loadfilter?category=men%2Fall-men');
          const content   = await result.json();
          prod = content.products; 
          products = [];
          prod.splice(0,3);
          prod.forEach(function(a){
          if (a.length == undefined){
            products.push({'link' : 'https://www.dedicatedbrand.com/en/' + a.canonicalUri, "brand" : "dedicated", 
            "price" : a.price.priceAsNumber, "name" : a.name, "photo" : a.image[0],
            '_id': uuidv5(a.canonicalUri, uuidv5.URL)});
          }
        });       
        total = JSON.stringify(products);
        fs.writeFileSync('sites/dedicated_products.json', total);     
        break;
        case 'adresse':
        const product1 = await adresseParis.scrape("https://adresse.paris/630-toute-la-collection");
        const product2 = await adresseParis.scrape("https://adresse.paris/630-toute-la-collection?p=2")
        products = product1.concat(product2);
        total = JSON.stringify(products, null, 2);
        fs.writeFileSync('sites/adresse_products.json', total);
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
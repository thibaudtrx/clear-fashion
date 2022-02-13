/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const fetch = require("node-fetch");

async function sandbox (eshop = 'https://www.dedicatedbrand.com/en/loadfilter?category=men%2Fall-men') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await dedicatedbrand.scrape(eshop);

    console.log(products);
    console.log(products.length);
    console.log('done');
    process.exit(0);

  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);








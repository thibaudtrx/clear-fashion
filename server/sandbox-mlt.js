/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/montlimart');

async function sandbox (eshop = 'https://www.montlimart.com/polos-t-shirts.html') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await dedicatedbrand.scrape(eshop);

    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);
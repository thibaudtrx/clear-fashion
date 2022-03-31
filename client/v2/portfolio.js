// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};
let filterBrand = "noFilter";

// instantiate the selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const selectBrand = document.querySelector('#brand-select'); 

/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result, meta}) => {
  currentProducts = result;
  currentPagination = meta;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */
const fetchProducts = async (page = 1, size = 12) => {
  try {
    const response = await fetch(
      `https://clear-fashion-server-gray.vercel.app?page=${page}&size=${size}`
    );
    const body = await response.json();
    var groupbyBrand = body.data.result.reduce(function(groups, item) { //create bybrand options
      const val = item["brand"]
      groups[val] = groups[val] || []
      groups[val].push(item)
      return groups
    }, {});
    var selectBox = document.getElementById('brand-select');
    selectBox.options.length=0;
    selectBox.options.add( new Option("-", "noFilter", false));
    for (var i =0, l = Object.keys(groupbyBrand).length; i< l; i++){
      var option = Object.keys(groupbyBrand)[i];
      selectBox.options.add( new Option(option, option, false));
    }
    selectBox.options.add(new Option("No filter", "noFilter", false));

    if (filterBrand!="noFilter"){
      body.data.result = groupbyBrand[filterBrand]
    }
    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};


/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = products
    .map(product => {
      return `
      <div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}">${product.name}</a>
        <span>${product.price}</span>
      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};

/**
 * Render page selector
 * @param  {Object} pagination
 */

const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
}; 

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const {count} = pagination;

  spanNbProducts.innerHTML = count;
};

const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
};

/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 */

/*
selectShow.addEventListener('change', event => {
  fetchProducts(currentPagination.currentPage, parseInt(event.target.value))
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});


selectPage.addEventListener('change', event => {
  fetchProducts(currentPagination.pageSize = parseInt(event.target.value))
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});
*/
selectShow.addEventListener('change', event => {
  currentPagination.pageSize = parseInt(event.target.value);
  fetchProducts(currentPagination.currentPage, currentPagination.pageSize)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});

selectPage.addEventListener('change', event => {
  currentPagination.currentPage = parseInt(event.target.value);
  fetchProducts(currentPagination.currentPage, currentPagination.pageSize)
  .then(setCurrentProducts)
  .then(() => render(currentProducts, currentPagination));
});

selectBrand.addEventListener('change', event => {
  filterBrand = event.target.value;
  fetchProducts(currentPagination.currentPage, currentPagination.pageSize)
  .then(setCurrentProducts)
  .then(() => render(currentProducts, currentPagination));
});


selectFilterReasonable.addEventListener('change', event => {
  filterReasonable = event.target.value;
  fetchProducts(currentPagination.currentPage, currentPagination.pageSize)
  .then(setCurrentProducts)
  .then(() => render(currentProducts, currentPagination));
});

selectFilterRecent.addEventListener('change', event => {
  filterRecent = event.target.value;
  fetchProducts(currentPagination.currentPage, currentPagination.pageSize)
  .then(setCurrentProducts)
  .then(() => render(currentProducts, currentPagination));
});

selectSort.addEventListener('change', event => {
  sortFilter = event.target.value;
  fetchProducts(currentPagination.currentPage, currentPagination.pageSize)
  .then(setCurrentProducts)
  .then(() => render(currentProducts, currentPagination));
});

selectFilterFavorite.addEventListener('change', event => {
  filterFavorite = event.target.value;
  fetchProducts(currentPagination.currentPage, currentPagination.pageSize)
  .then(setCurrentProducts)
  .then(() => render(currentProducts, currentPagination));
});



document.addEventListener('DOMContentLoaded', () =>
  fetchProducts()
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination))
);

'use strict';

const {db1, config} = require('./pgp');

// Bluebird is the best promise library available today,
// and is the one recommended here:
const promise = require('bluebird');


const model = {
    products: require('./model/products'),
    images: require('./model/images'),
    product_type: require('./model/category')
};

const options = {

    promiseLib: promise,

    extend: obj => {
        obj.products = model.products(obj);
        obj.images = model.images(obj);
        obj.product_type = model.product_type(obj);
    }
};


/*
const config = {
    host: 'localhost',
    port: 5433,
    database: 'dienthoai',
    user: 'postgres',
    password: 'abc'
};

console.log(config);
console.log(config1);
*/

const pgp = require('pg-promise')(options);


const db = pgp(config);
//console.log(db);
module.exports = db;

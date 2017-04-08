'use strict';

const {db1, config} = require('../pgp');

// Bluebird is the best promise library available today,
// and is the one recommended here:
var promise = require('bluebird');


var model = {
    products: require('../model/products'),
    images: require('../model/images')
};

var options = {

    promiseLib: promise,

    extend: obj => {
        obj.products = model.products(obj, pgp);
        obj.images = model.images(obj, pgp);
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

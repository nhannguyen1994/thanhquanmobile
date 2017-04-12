'use strict';

//var sql = require('../sql').products;

module.exports = (rep) => {

    return {
        byProductType: id =>
            rep.many('SELECT * FROM product WHERE category_id = $1', id),

        detail: id =>
            rep.oneOrNone('SELECT * FROM product WHERE product_id = $1', id),

        all: () =>
            rep.any('SELECT * FROM product ')
    };
};
'use strict';

//var sql = require('../sql').products;

module.exports = (rep) => {

    return {
        detail: id =>
            rep.oneOrNone('SELECT * FROM product WHERE product_id = $1', id),

        all: () =>
            rep.any('SELECT * FROM product ')
    };
};
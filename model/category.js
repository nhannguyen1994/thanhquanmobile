'use strict';

//var sql = require('../sql').products;

module.exports = (rep) => {

    return {
        childrenCat: id =>
            rep.any('SELECT * FROM product_type WHERE parent = $1', id),

        all: () =>
            rep.any('SELECT * FROM product_type')
    };
};
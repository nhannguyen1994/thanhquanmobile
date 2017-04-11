'use strict';

//var sql = require('../sql').products;

module.exports = (rep) => {

    return {
        listAllImagesById: id =>
            rep.any('SELECT * FROM images WHERE product_id = $1', id),

        all: () =>
            rep.any('SELECT * FROM images')
    };
};
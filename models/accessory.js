'use strict';

const Model = require('./model');

class Accessory extends Model{
    constructor (db){
        super(db);
        this.db = db;
    }
    selectByPagination (n, pgfrom) {
        //return this.db.many('SELECT * FROM product﻿ORDER BY product_id DESC LIMIT $1 OFFSET $2', [n, pgfrom]);
        return this.db.many("SELECT * FROM product_new WHERE category_id = 'C02' LIMIT $1 OFFSET $2", [n, pgfrom]);
    }
    countAll (){
        return this.db.many("SELECT count(*) FROM product_new WHERE category_id = 'C02'");
    }
    detail (id){
        return this.db.oneOrNone("SELECT * FROM product_new WHERE product_id = $1", id);
    }
    findByName (name){
        return this.db.any("SELECT * FROM product WHERE product_name like '%$1#%'", name);
    }
    selectHot (max){
        return this.db.many("SELECT * FROM product_new WHERE category_id = 'C02' ORDER BY sales_volume DESC LIMIT $1", max);
    }
    selectNew (max){
        return this.db.many("SELECT * FROM product_new WHERE category_id = 'C02' ORDER BY store_day ASC LIMIT $1", max);
    }
    selectByNewest(n, pgfrom) {
        return this.db.many("SELECT * FROM product_new WHERE category_id = 'C02' ORDER BY store_day DESC LIMIT $1 OFFSET $2", [n, pgfrom]);
    }
    selectBySales(n, pgfrom) {
        return this.db.many("SELECT * FROM product_new WHERE category_id = 'C02' ORDER BY sales_volume DESC LIMIT $1 OFFSET $2", [n, pgfrom]);
    }
    selectByPriceDesc(n, pgfrom) {
        return this.db.many("SELECT * FROM product_new WHERE category_id = 'C02' ORDER BY price DESC LIMIT $1 OFFSET $2", [n, pgfrom]);
    }
    selectByPriceAsc(n, pgfrom) {
        return this.db.many("SELECT * FROM product_new WHERE category_id = 'C02' ORDER BY price ASC LIMIT $1 OFFSET $2", [n, pgfrom]);
    }
}

module.exports = Accessory;

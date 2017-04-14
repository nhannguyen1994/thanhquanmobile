'use strict';

const Model = require('./model');

class Phukien extends Model{
    constructor (db){
        super(db);
        this.db = db;
    }
    selectBypagination (pgfrom, n) {
        //return this.db.many('SELECT * FROM product﻿ORDER BY product_id DESC LIMIT $1 OFFSET $2', [n, pgfrom]);
        return this.db.many('SELECT * FROM product ORDER BY product_id DESC LIMIT $1 OFFSET $2', [n, pgfrom]);
    }
    countAll (){
        return this.db.many("SELECT count(*) FROM product");
    }
    detail (id){
        return this.db.oneOrNone("SELECT * FROM product WHERE product_id = $1", id);
    }
    findByName (name){
        return this.db.any("SELECT * FROM product WHERE product_name like '%$1#%'", name);
    }
    selectHot (){
        return this.db.many("SELECT * FROM product ORDER BY sales_volume DESC LIMIT 10");
    }
    selectNew (max){
        return this.db.many("SELECT * FROM product ORDER BY store_day ASC LIMIT $1", max);
    }
}

module.exports = Phukien;

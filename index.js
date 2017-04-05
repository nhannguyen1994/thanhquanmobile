'use strict';

const db = require('./route/route.js');

const express = require('express');
const app = express();
const nunjucks = require('nunjucks');

// NOTE: We implement only GET handlers here, because:
// 1. This demo is to be tested by typing URL-s manually in the browser;
// 2. The demo's focus is on a proper database layer, not a web server.

//////////////////////////////////////////////
// Products Web API
//////////////////////////////////////////////

// create table Products:
GET('/products/create', db.products.create);

// drop the table:
GET('/products/drop', db.products.drop);

// remove all products:
GET('/products/empty', db.products.empty);

// add a new product with user Id and name:
GET('/products/add/:userId/:name', req => db.products.add({
    userId: +req.params.userId,
    name: req.params.name
}));

// find a product by id:
GET('/products/find/:id', req => db.products.find(+req.params.id));

// remove a product by id:
GET('/products/remove/:id', req => db.products.remove(+req.params.id));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});


// get all products:
GET('/products', db.products.all, 'product');

GET('/products/detail/:id', req => db.products.detail(req.params.id), 'detail');

/////////////////////////////////////////////
// Express/server part;
/////////////////////////////////////////////


nunjucks.configure('views', {
  autoescape: true,
  express   : app
});

// Generic GET handler;
function GET(url, handler, page) {
    app.get(url, (req, res) => {
        handler(req)
            .then(data => {
                if(page === 'product'){
                    res.render('index.html', {data : data});
                }else if(page === 'detail'){
                    res.render('detail.html', {data : data});
                }else {
                    res.json({
                        success: true,
                        data
                    });
                }

            })
            .catch(error => {
                res.json({
                    success: false,
                    error: error.message || error
                });
            });
    });
}

var port = 3000;

app.listen(port, () => {
    console.log('\nReady for GET requests on http://localhost:' + port);
});

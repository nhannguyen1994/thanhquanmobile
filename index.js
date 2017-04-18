'use strict';

let log = console.log;

const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const nunjucks = require('nunjucks');
//const session = require('express-session');

app.use(bodyParser.urlencoded({
    extended: true
}));

nunjucks.configure('views', {
  autoescape: true,
  express   : app,
  cache : false
});

// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true
// }));



app.engine('html', nunjucks.render);

app.set('view engine', 'html');

app.use(express.static(__dirname + '/public'));

let cart = '';


// app.use(function (req, res, next) {
//   log(1);
//     let session = req.session.item;

//     if (!session) {
//         session = req.session.item = {};
//     }
//     if(session['cart'] > 0) {
//         session['cart'] = session['cart'] + 1;
//     }else{
//       session['cart'] = 1;
//     }
//     next();
// });

require('./routes/routes')(app, express);

const port = 3000;
app.listen(port, () => {
    console.log('Ready for GET requests on http://localhost:' + port);
});

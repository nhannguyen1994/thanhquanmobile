'use strict';

let log = console.log;

const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const nunjucks = require('nunjucks');
const parseurl = require('parseurl');
const session = require('express-session');
const cookieSession = require('cookie-session')

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cookieSession({
  name: 'session',
  keys: ['cart']    ,

  // Cookie Options
  maxAge: 3 * 24 * 60 * 60 * 1000 // 3 days
}));

/*
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
*/

nunjucks.configure('views', {
  autoescape: false,
  express   : app,
  cache : false
});


app.engine('html', nunjucks.render);

app.set('view engine', 'html');

app.use(express.static(__dirname + '/public'));

require('./routes/routes')(app, express);

const port = 3002;
app.listen(port, () => {
    console.log('Ready for GET requests on http://localhost:' + port);
});

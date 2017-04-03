const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const server = app.listen(8080, () => {
  console.log('Web app listens at port 8080');
});

module.exports = server;
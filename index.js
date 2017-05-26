//Definition des modules
var express = require('express')
var bodyParser = require('body-parser');
var http = require("http");
var fs = require('fs');
var NodeRSA = require('node-rsa');
var app = express()

//MiddleWares
app.set('json spaces', 3);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//Définition des routes
var products = require ('./routes/products')
var users = require ('./routes/users')

//Applications des routes
app.use('/products', products);
app.use('/users', users);

//Route racine
app.get('/', function (req, res) {
  res.setHeader("Content-Type", "application/json");
  var json = JSON.stringify({ 
    message: "LibrarizeMe API", 
  }, null, 3);
  res.send(json);
})

//
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
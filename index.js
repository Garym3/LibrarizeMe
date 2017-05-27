//Definition des modules
var express = require('express')
var bodyParser = require('body-parser');
var http = require("http");
var fs = require('fs');
var jwt = require('jsonwebtoken');
var models = require('./models');
var app = express();

models.sequelize.sync({
  //true = overwrite ; false = doesn't overwrite but nothing happen ; else, error if tables already exist
  //force: true
});

//MiddleWares
app.set('json spaces', 3);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//Middleware de vérification du token de connexion
app.use(function(req, res, next){
  if(req.path.includes('auth')){
    next();
  } else {
    var token = req.get('Authorization');
    var passwd = fs.readFileSync('configuration/passphrasetoken').toString();
    try {
      var decoded = jwt.verify(token, passwd);
      next();
    } catch(err) {
      res.send(JSON.stringify({
        message: "Invalid token."
      }, null, 3));
    }
  }
});

//Définition des routes
var products = require ('./routes/products');
var users = require ('./routes/users');
var auth = require('./routes/auth');

//Applications des routes
app.use('/products', products);
app.use('/users', users);
app.use('/auth', auth);

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
  console.log('SERVER STARTED ON PORT 3000!');
})
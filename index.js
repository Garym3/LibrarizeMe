//Modules definitions
var express = require('express')
var bodyParser = require('body-parser');
var http = require("http");
var fs = require('fs');
var jwt = require('jsonwebtoken');
var models = require('./models');
var User = models.user;
var Product = models.product;
var Library = models.library;
var Friendship = models.friendship;
var Borrow = models.borrow;
var app = express();

/* BEGIN - SEQUELIZE ASSOCIATIONS */

User.belongsToMany(Product, {
  through: Library,
  foreignKey: 'id_User',
  otherKey: 'id_Product',
  as: 'owns'
});
Product.belongsToMany(User, {
  through: Library,
  foreignKey: 'id_Product',
  otherKey: 'id_User',
  as: 'ownedBy'
});
User.belongsToMany(User, {
  through: Friendship,
  foreignKey: 'id_User',
  otherKey: 'id_Friend',
  as: 'friendWith'
});
User.belongsToMany(User, {
  through: Borrow,
  foreignKey: 'id_Lender',
  otherKey: 'id_Borrower',
  as: 'loanWith'
});
User.belongsToMany(Product, {
  through: Borrow,
  foreignKey: 'id_Lender',
  otherKey: 'id_Product',
  as: 'lent'
});
User.belongsToMany(Product, {
  through: Borrow,
  foreignKey: 'id_Borrower',
  otherKey: 'id_Product',
  as: 'borrowed'
});

/* END - SEQUELIZE ASSOCIATIONS */

models.sequelize.sync({
  //true = overwrite ; false = doesn't overwrite ; else, error if data already exists
  //force: true
});

//MiddleWares
app.set('json spaces', 3);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//MiddleWare token verification
app.use(function (req, res, next) {
  if (req.path.includes('auth')) {
    next();
  } else if(req.path.includes('users/add')) {
    next();
  } else {
    var token = req.get('Authorization');
    var passwd = fs.readFileSync('config/passphrasetoken').toString();
    try {
      var decoded = jwt.verify(token, passwd);
      next();
    } catch (err) {
      res.send(JSON.stringify({
        message: "Invalid token."
      }, null, 3));
    }
  }
});

//Routes' definitions
var products = require('./routes/products');
var users = require('./routes/users');
var auth = require('./routes/auth');
var libraries = require('./routes/libraries');
var friendships = require('./routes/friendships');
var borrows = require('./routes/borrows');

app.use('/products', products);
app.use('/users', users);
app.use('/auth', auth);
app.use('/libraries', libraries);
app.use('/friendships', friendships);
app.use('/borrows', borrows);

//Root' route
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
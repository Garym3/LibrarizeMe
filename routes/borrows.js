var models  = require('../models');
var express = require('express');
var router  = express.Router();
var User = models.user;
var Product = models.product;
var Friendship = models.friendship;
var Library = models.library;
var Borrow = models.borrow;


module.exports = router;
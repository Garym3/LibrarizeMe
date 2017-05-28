'use strict';

var models  = require('../models');
var express = require('express');
var router  = express.Router();
var User = models.user;
var Product = models.product;
var Library = models.library;

/**
 * Add a product to the user's library
 */
router.get("/add/:idUser/:idProduct", function(req, res, next){
    let userId = req.params.idUser;
    let productId = req.params.idProduct;
    Library.create({
        id_User: userId,
        id_Product: productId
    }).then(function(result){
        res.json(result);
    }).catch(function(err){
        if(err) throw err;
    });
});

/**
 * Get all products of the user's library
 */
router.get("/get/:idUser", function(req, res, next){
    User.findAll({
        where: { id: req.params.idUser },
        include: [{
            model: Product, as: 'owns'            
        }]
    }).then(libProducts => {
        res.json(libProducts);
    }).catch(function(err){
        if(err) throw err;
    });
});

module.exports = router;
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
router.get("/add/:userid/:idProduct", function(req, res, next){
    //Product.find({ where: id: req.params.idProduct }, include: ['User']
});

// Find all projects with a least one task where task.state === project.state
router.get("/get/:userid", function(req, res, next){
    Product.findAll({
        include: [{
            model: Library,
            through: 
            {
                where: 
                {
                    '$Library.id_User$': req.params.userid
                }
            }
        }]
    }).then(function(data) {
        res.json(data);
    }).catch(function(err) {
        if(err) throw err;
    });
});

module.exports = router;
'use strict';

var models  = require('../models');
var express = require('express');
var router  = express.Router();


/**
 * Add a product to the user's library
 */
router.get("/add/:idProduct", function(req, res, next){
    models.library.create({
        where: { id: req.params.id }
    }).then(function(result){
        res.json(result);
    }).catch(function(err){
        if(err) throw err;
    });
});
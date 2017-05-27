'use strict';

var models  = require('../models');
var express = require('express');
var router  = express.Router();

/* PRODUCT REGION */

/**
 * Add a product
 */
router.get("/add/:libelle/:type/:description/:ean13Code", function(req, res){
    let libelle = req.params.libelle;
    let type = req.params.type;
    let description = req.params.description;
    let ean13Code = req.params.ean13Code;
    models.product.create({
        libelle: libelle,
        type: type,
        description: description,
        ean13Code: ean13Code
    }).then(function(result){
        res.json(result);
    }).catch(function(err){
        if(err) throw err;
    });
});

/**
 * Get all products
 */
router.get("/", function(req,res,next){
    models.product.findAll({limit: 20})
    .then(function(result){
        res.json(result);
    }).catch(function(err){
        if (err) throw err;
    });
});

/**
 * Get all products depending on the entered id, libelle, type, or ean13 code and the value
 */
router.get("/get/details/:attribute/:value", function(req, res){
    var attr = req.params.attribute;
    switch(attr) {
        case "id":
            models.product.find({
                where: { id: req.params.value },
                limit: 20
            }).then(function(result){
                res.json(result);
            }).catch(function(err){
                if (err) throw err;
            });
            break;
        case "libelle":
            models.product.findAll({
                //where: { libelle: req.params.value },
                where: { libelle: { $like: "%" + req.params.value + "%" } },
                limit: 20                
            }).then(function(result){
                res.json(result);
            }).catch(function(err){
                if (err) throw err;
            });
            break;
        case "type":
            models.product.findAll({
                where: { type: req.params.value },
                limit: 20
            }).then(function(result){
                res.json(result);
            }).catch(function(err){
                if (err) throw err;
            });
            break;
        case "ean13Code":
            models.product.findAll({
                where: { ean13Code: req.params.value },
                limit: 20
            }).then(function(result){
                res.json(result);
            }).catch(function(err){
                if (err) throw err;
            });
            break;
        default:
            models.product.find()
            .then(function(result){
                res.json(null);
            }).catch(function(err){
                if (err) throw err;
            });
    } 
});

/**
 * Get all products depending on the entered id, libelle, type, or ean13 code and the value
 */
router.get("/get/filterby/:type/:value", function(req, res){
    var attr = req.params.attribute;
    models.product.findAll({
        where: { libelle: { $like: "%" + req.params.value + "%", $and: { type: req.params.type } } },
        limit: 20
    }).then(function(result){
        res.json(result);
    }).catch(function(err){
        if (err) throw err;
    });
});

/**
 * Delete a product according to his ID
 */
router.get("/delete/:id", function(req,res){
    models.product.destroy({
        where: { id: req.params.id }
    }).then(function(result){
        res.json(result);
    }).catch(function(err){
        if(err) throw err;
    });
});


module.exports = router;
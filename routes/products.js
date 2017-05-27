'use strict';

var models  = require('../models');
var express = require('express');
var router  = express.Router();

/* PRODUCT REGION */

/**
 * Add a product
 */
router.get("/add/:libelle/:type/:description/:releaseDate/:price/:publisher/:authors/:ean13Code/:likes/:views", function(req, res){
    let libelle = req.params.libelle;
    let type = req.params.type;
    let description = req.params.description;
    let releaseDate = req.params.releaseDate;
    let price = req.params.price;
    let publisher = req.params.publisher;
    let authors = req.params.authors;
    let ean13Code = req.params.ean13Code;
    let likes = req.params.likes;
    let views = req.params.views;
    models.product.create({
        libelle: libelle,
        type: type,
        description: description,
        releaseDate: releaseDate,
        price: price,
        publisher: publisher,
        authors: authors,
        ean13Code: ean13Code,
        likes: likes,
        views: views
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
    var val = req.params.value;
    switch(attr){
        case "id":
            models.product.find({
                where: { id: val },
                limit: 20
            }).then(function(result){
                res.json(result);
            }).catch(function(err){
                if (err) throw err;
            });
            break;
        case "libelle":
            models.product.findAll({
                where: { libelle: { $like: "%" + val + "%" } },
                limit: 20                
            }).then(function(result){
                res.json(result);
            }).catch(function(err){
                if (err) throw err;
            });
            break;
        case "type":
            models.product.findAll({
                where: { type: val },
                limit: 20
            }).then(function(result){
                res.json(result);
            }).catch(function(err){
                if (err) throw err;
            });
            break;
        case "ean13Code":
            models.product.findAll({
                where: { ean13Code: val },
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
 * SEARCH BAR
 * Get all products depending on the entered type and libelle
 */
router.get("/get/filterby/:type/:value", function(req, res){
    models.product.findAll({
        where: { 
            libelle: { $like: "%" + req.params.value + "%"},
            $and: { 
                type: req.params.type
            }
        },
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
        res.json(result); // Retourne '1' true ou '0' false
    }).catch(function(err){
        if(err) throw err;
    });
});


module.exports = router;
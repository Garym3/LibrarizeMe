'use strict';

var models  = require('../models');
var express = require('express');
var router  = express.Router();

//Ajouter un produit
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

//Affiche les produits
router.get("/", function(req,res,next){
    models.product.findAll().then(function(result) {
        res.json(result);
    });

});

//Affiche le produit celon son identifiant
router.get("/get/:idproduct", function(req, res){
    models.product.find({
        where: { id: req.params.idproduct },
    }).then(function(result){
        res.json(result);
    }).catch(function(err){
        if (err) throw err;
    });
});

//Supprime un produit selon son identifiant
router.get("/delete/:idproduct", function(req,res){
    models.product.destroy({
        where: { id: req.params.idproduct }
    }).then(function(result){
        res.json(result);
    }).catch(function(err){
        if(err) throw err;
    });
});
module.exports = router;
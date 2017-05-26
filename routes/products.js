'use strict';

var models  = require('../models');
var express = require('express');
var router  = express.Router();

//Crée un produit
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

//Récupère tous les produits
router.get("/", function(req,res,next){
    models.product.findAll()
    .then(function(result){
        res.json(result);
    }).catch(function(err){
        if (err) throw err;
    });
});

//Récupère tous les produits selon le champ et la valeur saisis
router.get("/get/:attribute/:value", function(req, res){
    let attr = req.params.attribute;
    switch(attr) {
        case "id":
            models.product.find({
                where: { id: req.params.value },
            }).then(function(result){
                res.json(result);
            }).catch(function(err){
                if (err) throw err;
            });
            break;
        case "libelle":
            models.product.findAll({
                where: { type: req.params.value },
                //where: { libelle: { $like: "%" + req.params.value + "%" } },
            }).then(function(result){
                res.json(result);
            }).catch(function(err){
                if (err) throw err;
            });
            break;
        case "type":
            models.product.findAll({
                where: { type: req.params.value },
            }).then(function(result){
                res.json(result);
            }).catch(function(err){
                if (err) throw err;
            });
            break;
        case "ean13Code":
            models.product.findAll({
                where: { type: req.params.value },
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

//Supprime un produit selon son identifiant
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
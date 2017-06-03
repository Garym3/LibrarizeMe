'use strict';

var models = require('../models');
var express = require('express');
var router = express.Router();
var Product = models.product;

/* PRODUCT REGION */

/**
 * Add a product
 */
router.get("/add/:libelle/:type/:description/:releaseDate/:price/:publisher/:authors/:ean13Code/:likes/:views", function (req, res) {
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
    Product.create({
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
    }).then(function (result) {
        res.json(result);
    }).catch(function (err) {
        if (err) {
            res.json("Error while adding for a product.\n" + err);
            throw err;
        }
    });
});

/**
 * Get all products
 */
router.get("/", function (req, res, next) {
    Product.findAll({
        where: { deletedAt: null },
        limit: 20
    })
        .then(function (result) {
            res.json(result);
        }).catch(function (err) {
            if (err) {
                res.json("Error while querying for all products.\n" + err);
                throw err;
            }
        });
});

/**
 * Get all products depending on the entered id, libelle, type, or ean13 code and the value
 */
router.get("/get/details/:attribute/:value", function (req, res) {
    let attr = req.params.attribute;
    let val = req.params.value;
    switch (attr) {
        case "id":
            Product.find({
                where: { id: val, deletedAt: null },
                limit: 20
            }).then(function (result) {
                res.json(result);
            }).catch(function (err) {
                if (err) {
                    res.json("Error while querying for a product's id.\n" + err);
                    throw err;
                }
            });
            break;
        case "libelle":
            Product.findAll({
                where: { libelle: { $like: "%" + val + "%" }, deletedAt: null },
                limit: 20
            }).then(function (result) {
                res.json(result);
            }).catch(function (err) {
                if (err) {
                    res.json("Error while querying for a product's libelle.\n" + err);
                    throw err;
                }
            });
            break;
        case "type":
            Product.findAll({
                where: { type: val, deletedAt: null },
                limit: 20
            }).then(function (result) {
                res.json(result);
            }).catch(function (err) {
                if (err) {
                    res.json("Error while querying for a product's type.\n" + err);
                    throw err;
                }
            });
            break;
        case "ean13Code":
            Product.findAll({
                where: { ean13Code: val, deletedAt: null },
                limit: 20
            }).then(function (result) {
                res.json(result);
            }).catch(function (err) {
                if (err) {
                    res.json("Error while querying a product's ean13 code.\n" + err);
                    throw err;
                }
            });
            break;
        default:
            Product.find()
                .then(function (result) {
                    res.json("Unknown error while querying for products.\n" + null);
                }).catch(function (err) {
                    if (err) {
                        res.json("Unknown error while querying for products.\n" + err);
                        throw err;
                    }
                });
    }
});

/**
 * SEARCH BAR
 * Get all products depending on the entered type and libelle
 */
router.get("/get/filterby/:type/:libelle", function (req, res) {
    Product.findAll({
        where: {
            libelle: { $like: "%" + req.params.libelle + "%" },
            type: req.params.type,
            deletedAt: null
        },
        limit: 20
    }).then(function (result) {
        res.json(result);
    }).catch(function (err) {
        if (err) {
            res.json("Error while querying for product with a search filter.\n" + err);
            throw err;
        }
    });
});

/**
 * Delete a product according to his ID
 */
router.get("/delete/:idProduct", function (req, res) {
    Product.destroy({
        where:
        {
            id: req.params.idProduct,
            deletedAt: null
        }
    }).then(function (result) {
        res.json(result); // return '1' = success or '0' = fail
    }).catch(function (err) {
        if (err) {
            res.json("Error while deleting a product via its id.\n" + err);
            throw err;
        }
    });
});


module.exports = router;
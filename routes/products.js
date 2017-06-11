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
    Product.upsert({
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
        res.json({
            success: true,
            message: "Product has been succesfully created or updated if it already exists."
        });
    }).catch(function (err) {
        if (err) {
            res.json({
                success: false,
                message: "Unhandled error while creating the product."
            });
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
                res.json({
                    success: false,
                    message: "Unhandled error while querying for the products."
                });
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
                    res.json({
                        success: false,
                        message: "Error while querying for a product's id."
                    });
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
                    res.json({
                        success: false,
                        message: "Error while querying for a product's libelle."
                    });
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
                    res.json({
                        success: false,
                        message: "Error while querying for a product's type."
                    });
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
                    res.json({
                        success: false,
                        message: "Error while querying for a product's ean13Code."
                    });
                    throw err;
                }
            });
            break;
        default:
            Product.find()
                .then(function (result) {
                    res.json("Unknown behavior while querying for products.");
                }).catch(function (err) {
                    if (err) {
                        res.json({
                            success: false,
                            message: "Unknown error while querying for products."
                        });
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
            res.json({
                success: false,
                message: "Unknown error while querying for filtered products."
            });
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
            res.json({
                success: false,
                message: "Error while deleting a product via its id."
            });
            throw err;
        }
    });
});


module.exports = router;
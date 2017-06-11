'use strict';

var models = require('../models');
var express = require('express');
var router = express.Router();
var User = models.user;
var Product = models.product;
var Library = models.library;

/**
 * Add a product to the user's library
 */
router.get("/add/:idUser/:idProduct", function (req, res, next) {
    let userId = req.params.idUser;
    let productId = req.params.idProduct;
    Library.upsert({
        id_User: userId,
        id_Product: productId
    }).then(function (result) {
        res.json(JSON.stringify({
            success: true,
            message: "Product has been succesfully added to the library or updated if it already exists in the library."
        }));
    }).catch(function (err) {
        if (err) {
            res.json(JSON.stringify({
                success: false,
                message: "Error while adding a product to the user's library."
            }));
            throw err;
        }
    });
});

/**
 * Get all products of the user's library
 */
router.get("/get/:idUser", function (req, res, next) {
    User.findAll({
        //attributes: [], // Comment this to get user of 'idUser'
        where: { id: req.params.idUser, deletedAt: null },
        include: [{ model: Product, as: 'owns' }],
        limit: 20
    }).then(libProducts => {
        res.json(libProducts);
    }).catch(function (err) {
        if (err) {
            res.json(JSON.stringify({
                success: false,
                message: "Error while querying the user's products."
            }));
            throw err;
        }
    });
});

/**
 * Delete a product from the user's library
 */
router.get("/delete/:idUser/:idProduct", function (req, res, next) {
    Library.destroy({
        where:
        {
            id_User: req.params.idUser,
            id_Product: req.params.idProduct,
            deletedAt: null
        }
    }).then(result => {
        res.json(result); // return '1' = success or '0' = fail
    }).catch(function (err) {
        if (err) {
            res.json(JSON.stringify({
                success: false,
                message: "Error while deleting a product from the user's library."
            }));
            throw err;
        }
    });
});

module.exports = router;
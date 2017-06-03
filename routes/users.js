'use strict';

var express = require("express");
var models = require("../models");
var router = express.Router();
var User = models.user;

/* USER REGION */

/**
 * Create an user
 */
router.get("/add/:email/:password/:pseudo/:lastname/:firstname/:phone/:isSubscribed", function (req, res, next) {
    let email = req.params.email;
    let password = req.params.password;
    let pseudo = req.params.pseudo;
    let lastname = req.params.lastname;
    let firstname = req.params.firstname;
    let phone = req.params.phone;
    let isSubscribed = req.params.isSubscribed;
    User.create({
        email: email,
        password: password,
        pseudo: pseudo,
        lastname: lastname,
        firstname: firstname,
        phone: phone,
        isSubscribed: isSubscribed
    }).then(function (result) {
        res.json(result);
    }).catch(function (err) {
        if (err) throw err;
    });
});

/**
 * Get a list of all users
 */
router.get("/", function (req, res) {
    User.findAll({
        deletedAt: null,
        limit: 20
    }).then(function (result) {
        res.send(result);
    }).catch(function (err) {
        if (err) throw err;
    });
});

/**
 * Get an user via its id
 */
router.get("/get/id/:idUser", function (req, res) {
    User.find({
        where: { id: req.params.idUser, deletedAt: null },
        limit: 20
    }).then(function (result) {
        res.send(result);
    }).catch(function (err) {
        if (err) throw err;
    });
});

/**
 * Get an user via its pseudo
 */
router.get("/get/pseudo/:pseudo", function (req, res) {
    User.find({
        where: { pseudo: { $like: "%" + req.params.pseudo + "%" }, deletedAt: null },
        limit: 20
    }).then(function (result) {
        res.send(result);
    }).catch(function (err) {
        if (err) throw err;
    });
});

/**
 * Get an user via its email
 */
router.get("/get/email/:email", function (req, res) {
    User.find({
        where: { email: { $like: "%" + req.params.email + "%" }, deletedAt: null },
        limit: 20
    }).then(function (result) {
        res.send(result);
    }).catch(function (err) {
        if (err) throw err;
    });
});

/**
 * Set a chosen new password 
 */
router.get('/changepassword/:idUser/:newPassword', function (req, res) {
    User.find({ where: { id: req.params.idUser } }).then(function (result) {
        if (result) {
            User.update({ password: req.params.newPassword },
                {
                    where: { id: req.params.idUser, deletedAt: null }
                }).then(function (updateResult) {
                    if (updateResult) {
                        res.send(JSON.stringify({
                            success: true,
                            message: "Password successfully updated."
                        }));
                    }
                }).catch(function (updateErr) {
                    if (updateErr) {
                        res.send(JSON.stringify({
                            success: false,
                            message: "Error while updating password."
                        }));
                        throw err;
                    }
                });
        } else {
            res.send(JSON.stringify({
                success: false,
                message: "Error while changing password. No account with this ID."
            }))
        }

    }).catch(function (err) {
        if (err) {
            res.send(JSON.stringify({
                success: false,
                message: "Error while changing password."
            }));
            throw err;
        }
    });
});

/**
 * Delete an user via its id
 */
router.get("/delete/:idUser", function (req, res) {
    User.destroy({
        where:
        {
            id: req.params.idUser,
            deletedAt: null
        }
    }).then(function (result) {
        res.json(result);
    }).catch(function (err) {
        if (err) throw err;
    });
});

module.exports = router;
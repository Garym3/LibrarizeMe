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
    User.upsert({
        email: email,
        password: password,
        pseudo: pseudo,
        lastname: lastname,
        firstname: firstname,
        phone: phone,
        isSubscribed: isSubscribed
    }).then(function (result) {
        res.json({
            success: true,
            message: "User has been succesfully created or updated if he already exists."
        });
    }).catch(function (err) {
        if (err) {
            res.json({
                success: false,
                message: "Unhandled error while creating the user."
            });
            throw err;
        }
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
        res.json(result);
    }).catch(function (err) {
        if (err) {
            res.json({
                success: false,
                message: "Unhandled error while querying all users."
            });
            throw err;
        }
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
        res.json(result);
    }).catch(function (err) {
        if (err) {
            res.json({
                success: false,
                message: "Unhandled error while querying user's id."
            });
            throw err;
        }
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
        res.json(result);
    }).catch(function (err) {
        if (err) {
            res.json({
                success: false,
                message: "Unhandled error while querying user's pseudo."
            });
            throw err;
        }
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
        res.json(result);
    }).catch(function (err) {
        if (err) {
            res.json({
                success: false,
                message: "Unhandled error while querying user's email."
            });
            throw err;
        }
    });
});

/**
 * Update the user's informations
 */
router.get("/update/:idUser/:lastname/:firstname/:phone", function (req, res) {
    User.update(
        { 
            lastname: req.params.lastname,
            firstname: req.params.firstname,
            phone: req.params.phone 
        }, 
        { where: { id: req.params.idUser }
    }).then(function (result) {
        res.json({
                success: true,
                message: "User successfully updated."
            });    
    }).catch(function (err) {
        if (err) {
            res.json({
                success: false,
                message: "Unhandled error while updating the user."
            });
            throw err;
        }
    });
});

/**
 * Set a chosen new password 
 */
router.get('/changepassword/:idUser/:newPassword', function (req, res) {
    User.find({ where: { id: req.params.idUser } }).then(function (result) {
        if (result) {
            User.update({ password: req.params.newPassword },{
                    where: { id: req.params.idUser, deletedAt: null }
                }).then(function (updateResult) {
                    if (updateResult) {
                        res.json({
                            success: true,
                            message: "Password successfully updated."
                        });
                    }
                }).catch(function (updateErr) {
                    if (updateErr) {
                        res.json({
                            success: false,
                            message: "Error while updating password."
                        });
                        throw err;
                    }
                });
        } else {
            res.json({
                success: false,
                message: "Error while updating password. No account with such ID."
            });
        }

    }).catch(function (err) {
        if (err) {
            res.json({
                success: false,
                message: "Error while updating password."
            });
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
        res.json({
            success: true,
            message: "User successfully deleted."
        });
    }).catch(function (err) {
        if (err) {
            res.json({
                success: false,
                message: "Unhandled error while deleting the user."
            });
            throw err;
        }
    });
});

module.exports = router;
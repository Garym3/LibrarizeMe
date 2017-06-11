'use strict';

var models = require('../models');
var express = require('express');
var router = express.Router();
var User = models.user;
var Product = models.product;
var Friendship = models.friendship;
var Library = models.library;

/**
 * Send a friend request from a user to another one
 */
router.get("/request/:idUser/:idFriend", function (req, res, next) {
    let userId = req.params.idUser;
    let friendId = req.params.idFriend;
    Friendship.upsert({
        id_User: userId,
        id_Friend: friendId,
        isAccepted: 0,
        deletedAt: null
    }).then(function (result) {
        res.json(JSON.stringify({
            success: true,
            message: "Friendship request has been successfully sent or updated if it already exists."
        }));
    }).catch(function (err) {
        if (err) {
            res.json(JSON.stringify({
                success: false,
                message: "Error while setting the friend request."
            }));
            throw err;
        }
    });
});

/**
 * Accept a friend request 
 */
router.get("/accept/:idUser/:idFriend", function (req, res, next) {
    let userId = req.params.idUser;
    let friendId = req.params.idFriend;
    Friendship.upsert({
        id_User: userId,
        id_Friend: friendId,
        isAccepted: 1,
        deletedAt: null
    }).then(function (result) {
        Friendship.upsert({
            id_User: friendId,
            id_Friend: userId,
            isAccepted: 1,
            deletedAt: null
        }).then(function (result) {
            res.json(JSON.stringify({
                success: true,
                message: "Friendship request has been successfully accepted or updated if it already exists."
            }));
        }).catch(function (err) {
            if (err) {
                res.json(JSON.stringify({
                    success: false,
                    message: "Error while accepting the friend request."
                }));
                throw err;
            }
        });
        return null;
    }).catch(function (err) {
        if (err) {
            res.json(JSON.stringify({
                success: false,
                message: "Error while setting the friend request."
            }));
            throw err;
        }
    });
});


/**
 * Get all users's friends
 */
router.get("/get/:idUser", function (req, res, next) {
    User.findAll({
        //attributes: [], // Comment this to get user of 'idUser'
        where: { id: req.params.idUser, deletedAt: null },
        include: [{ model: User, as: 'friendWith', through: { where: { isAccepted: 1, deletedAt: null } } }],
        limit: 20
    }).then(friendsList => {
        res.json(friendsList);
    }).catch(function (err) {
        if (err) {
            res.json(JSON.stringify({
                success: false,
                message: "Error while querying a friendship."
            }));
            throw err;
        }
    });
});

/**
 * Get a specific users's friend
 */
router.get("/get/:idUser/:idFriend", function (req, res, next) {
    User.find({
        //attributes: [], // Comment this to get user of 'idUser'
        where: { id: req.params.idUser, deletedAt: null },
        include: [{ model: User, as: 'friendWith', where: { id: req.params.idFriend, deletedAt: null } }]
    }).then(friendsList => {
        res.json(friendsList);
    }).catch(function (err) {
        if (err) {
            res.json(JSON.stringify({
                success: false,
                message: "Error while querying a friendship."
            }));
            throw err;
        }
    });
});

/**
 * Get all owned products (library) of the users's friend
 */
router.get("/get/library/:idUser/:idFriend", function (req, res, next) {
    User.findAll({
        //attributes: [], // Comment this to get user of 'idUser'
        where: { id: req.params.idUser, deletedAt: null },
        include:
        [{
            //attributes: [], // Comment this to get products and user of 'idFriend'
            where: { id: req.params.idFriend, deletedAt: null },
            model: User, as: 'friendWith', through: { where: { isAccepted:1, deletedAt:null } },
            include:
            [{
                //attributes: [], // Comment this to get products of 'idFriend'
                model: Product, as: 'owns', where: { deletedAt: null }
            }]
        }]
    }).then(friendLibrary => {
        res.json(friendLibrary);
    }).catch(function (err) {
        if (err) {
            res.json(JSON.stringify({
                success: false,
                message: "Error while querying a library's friend."
            }));
            throw err;
        }
    });
});

/**
 * Delete a users's friend (=) abort a friend request (=) refuse a friend request 
 */
router.get("/delete/:idUser/:idFriend", function (req, res, next) {
    Friendship.destroy({
        where:
        {
            id_User: req.params.idUser,
            id_Friend: req.params.idFriend,
            deletedAt: null
        }
    }).then(result => {
            res.json(JSON.stringify({
                success: true,
                message: "Friendship has been succesfully deleted."
            }));
    }).catch(function (err) {
        if (err) {
            res.json(JSON.stringify({
                success: false,
                message: "Error while deleting a friendship."
            }));
            throw err;
        }
    });
});

module.exports = router;
var models  = require('../models');
var express = require('express');
var router  = express.Router();
var User = models.user;
var Product = models.product;
var Friendship = models.friendship;
var Library = models.library;
var Borrow = models.borrow;

/**
 * A user borrows something from another user
 * 
 * First, it's a one-way friendship where A wants to befriend B.
 * Then, A technically has B for friend, but B has not.
 * Finally, B accepts and the friendship is settled.
 * If B refuses, then we can delete the one-way friendship of A with the delete route.
 */
router.get("/add/:idUser/:idFriend", function(req, res, next){
    let userId = req.params.idUser;
    let friendId = req.params.idFriend;
    Friendship.create({
        id_User: userId,
        id_Friend: friendId
    }).then(function(result){
        res.json(result);
    }).catch(function(err){
        if(err) {
            res.json("Error while setting a friendship.\n" + err);
            throw err;
        }
    });
});

/**
 * Get all users's friends
 */
router.get("/get/:idUser", function(req, res, next){
    User.findAll({
        //attributes: [], // Comment this to get user of 'idUser'
        where: { id: req.params.idUser, deletedAt: null },
        include: [{ model: User, as: 'friendWith' }],
        limit: 20
    }).then(friendsList => {
        res.json(friendsList);
    }).catch(function(err){
        if(err) {
            res.json("Error while querying a friendship.\n" + err);
            throw err;
        }
    });
});

/**
 * Get a specific users's friend
 */
router.get("/get/:idUser/:idFriend", function(req, res, next){
    User.find({
        //attributes: [], // Comment this to get user of 'idUser'
        where: { id: req.params.idUser, deletedAt: null },
        include: 
        [{ 
            model: User, as: 'friendWith', where: { id: req.params.idFriend } 
        }]
    }).then(friendsList => {
        res.json(friendsList);
    }).catch(function(err){
        if(err) {
            res.json("Error while querying a friendship.\n" + err);
            throw err;
        }
    });
});

/**
 * Get all owned products (library) of the users's friend
 */
router.get("/get/library/:idUser/:idFriend", function(req, res, next){ 
    User.findAll({
        //attributes: [], // Comment this to get user of 'idUser'
        where: { id: req.params.idUser, deletedAt: null },
        include:
        [{
            //attributes: [], // Comment this to get products and user of 'idFriend'
            where: { id: req.params.idFriend, deletedAt: null },
            model: User, as: 'friendWith',
            include: 
            [{
                //attributes: [], // Comment this to get products of 'idFriend'
                model: Product, as: 'owns', where: { deletedAt: null }
            }]
        }]
    }).then(friendProductsList => {
        res.json(friendProductsList);
    }).catch(function(err){
        if(err) {
            res.json("Error while querying a library's friend.\n" + err);
            throw err;
        }
    });
});

/**
 * Delete a users's friend
 * 
 * It needs to be done twice, each time for each friendship's side
 * only if the friendship is already mutual.
 */
router.get("/delete/:idUser/:idFriend", function(req, res, next){
    Friendship.destroy({
        where: 
        { 
            id_User: req.params.idUser,
            id_Friend: req.params.idFriend,
            deletedAt: null
        }
    }).then(result => {
        res.json(result); // return '1' = success or '0' = fail
    }).catch(function(err){
        if(err) {
            res.json("Error while deleting a friendship.\n" + err);
            throw err;
        }
    });
});

module.exports = router;
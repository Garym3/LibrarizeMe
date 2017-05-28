var models  = require('../models');
var express = require('express');
var router  = express.Router();
var User = models.user;
var Product = models.product;
var Friendship = models.friendship;
var Library = models.library;
var Borrow = models.borrow;

/**
 * Set a 'loan' where an user borrows something from another user
 * Lender = gives to
 * Borrower = receives from
 */
router.get("/add/:idLender/:idBorrower/:idProduct", function(req, res, next){
    let lender_userId = req.params.idLender;
    let borrower_userId = req.params.idBorrower;
    let productId = req.params.idProduct;
    Borrow.create({
        id_Product: productId,
        id_Lender: lender_userId,
        id_Borrower: borrower_userId
    }).then(function(result){
        // check if all associated objects are as expected
        /*Product.setUsers([user1, user2]).then(() => {
        return project.hasUsers([user1]);
        }).then(result => {
        // result would be false
        return project.hasUsers([user1, user2]);
        }).then(result => {
        // result would be true
        })*/
        res.json(result);
    }).catch(function(err){
        if(err) {
            res.json("Error while setting a loan.\n" + err);
            throw err;
        }
    });
});


/**
 * Get all users's loans
 */
/*router.get("/get/:idUser", function(req, res, next){
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
});*/

/**
 * Get a specific users's friend
 */
/*router.get("/get/:idUser/:idFriend", function(req, res, next){
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
});*/

/**
 * Get all owned products (library) of the users's friend
 */
/*router.get("/get/library/:idUser/:idFriend", function(req, res, next){ 
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
});*/

/**
 * Delete a users's friend
 * 
 * It needs to be done twice, each time for each friendship's side
 * only if the friendship is already mutual.
 */
/*router.get("/delete/:idUser/:idFriend", function(req, res, next){
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
});*/

module.exports = router;
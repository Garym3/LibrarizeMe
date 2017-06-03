var models  = require('../models');
var express = require('express');
var router  = express.Router();
var User = models.user;
var Product = models.product;
var Friendship = models.friendship;
var Library = models.library;
var Borrow = models.borrow;

/**
 * Set a 'loan' where an user borrows something from another user, or returns it if it exists
 * Lender = gives to
 * Borrower = receives from
 */
router.get("/add/:idProduct/:idLender/:idBorrower", function(req, res, next){
    let productId = req.params.idProduct;
    let lenderId = req.params.idLender;
    let borrowerId = req.params.idBorrower;
    if(lenderId != borrowerId) {
        /*Borrow.findOrCreate({
            where: { 
                    id_Product: productId,
                    id_Lender: { $or: { $eq: lenderId, $eq: borrowerId } },
                    id_Borrower: { $or: { $eq: borrowerId, $eq: lenderId } },
                deletedAt: null
            }, 
            defaults: { // Creation if it doesn't exist
                id_Product: productId,
                id_Lender: lenderId,
                id_Borrower: borrowerId
            }
        }).then(function(result){
            res.json(result);
        }).catch(function(err){
            if(err) {
                res.json("Error while setting a loan.\n" + err);
                throw err;
            }
        });*/
        Borrow.upsert({
            id_Product: productId,
            id_Lender: lenderId,
            id_Borrower: borrowerId
        }).then(function(result){
            res.json(result);
        }).catch(function(err){
            if(err) {
                res.json("Error while setting a loan.\n" + err);
                throw err;
            }
        });
    } else {
        res.json("ERROR: Borrower id and lender id are the same.");
    }
});


/**
 * Get all users's borrowings
 */
router.get("/get/:borrowerId", function(req, res, next){
    Borrow.findAll({
        where: { id_Borrower: req.params.borrowerId, deletedAt: null },
        //include: [{ model: User, as: 'loanWith', where: { id_Borrower: req.params.userId } }],
        limit: 20
    }).then(borrowingsList => {
        res.json(borrowingsList);
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
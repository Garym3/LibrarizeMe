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


module.exports = router;
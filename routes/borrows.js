var models = require('../models');
var express = require('express');
var router = express.Router();
var User = models.user;
var Product = models.product;
var funcsFriends = require('./funcs_friendships.js');
var funcsLibrary = require('./funcs_librairies.js');
var Borrow = models.borrow;

/**
 * Set a 'loan' where an user borrows something from another user, or returns it if it exists
 * Lender = gives to
 * Borrower = receives from
 */
router.get("/add/:idProduct/:idLender/:idBorrower", function (req, res, next) {
    let productId = req.params.idProduct;
    let lenderId = req.params.idLender;
    let borrowerId = req.params.idBorrower;
    let begin = true;

    if (lenderId == borrowerId) {
        res.send(JSON.stringify({
            success: false,
            message: "Borrower id and lender id are the same."
        }));
        begin = false;
    }

    /*if(!funcsLibrary.verifyIfUserHasProduct(lenderId, productId)){
        res.send(JSON.stringify({
            success: false,
            message: "User doesn't have the product on his library."
        }));
        begin = false;
    }*/

    if(funcsFriends.verifyFriendShip(lenderId, borrowerId) == false){
        res.send(JSON.stringify({
            success: false,
            message: "User is not friend with the borrower."
        }));
        begin = false;
    }

    if(begin){
        Borrow.findOrCreate({
            where: { //TODO: empêcher d'emprunter un produit qu'on a actuellement prêté
                id_Product: productId,
                id_Lender: lenderId,
                id_Borrower: borrowerId,
                deletedAt: null
            },
            defaults: { // Creation if it doesn't exist
                id_Product: productId,
                id_Lender: lenderId,
                id_Borrower: borrowerId
            }
        }).then(function (result) {
            res.json(result);
        }).catch(function (err) {
            if (err) {
                res.json("Error while setting a loan.\n" + err);
                throw err;
            }
        });
    }        
});


/**
 * Get all users's borrowings
 */
router.get("/get/:idUser", function (req, res, next) {
    User.findAll({
        //attributes: [], // Comment this to get user of 'idUser'
        where: { id: req.params.idUser, deletedAt: null },
        include: [{ model: Product, as: 'borrowed' }],
        include: [{ model: Product, as: 'lent' }],
        limit: 20
    }).then(borrowingsList => {
        res.json(borrowingsList);
    }).catch(function (err) {
        if (err) {
            res.json("Error while querying the user's borrowings.\n" + err);
            throw err;
        }
    });
});

module.exports = router;
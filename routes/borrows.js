var models = require('../models');
var express = require('express');
var router = express.Router();
var User = models.user;
var Product = models.product;
var Borrow = models.borrow;

/**
 * Set a borrowing between two users which are friends
 * Lender = gives to
 * Borrower = receives from
 */
router.get("/add/:idProduct/:idLender/:idBorrower", function (req, res, next) {
    let productId = req.params.idProduct;
    let lenderId = req.params.idLender;
    let borrowerId = req.params.idBorrower;

    if (lenderId == borrowerId) {
        res.json({
            success: false,
            message: "Borrower id and lender id are the same."
        });
        return;
    }
    Borrow.upsert({
        id_Product: productId,
        id_Lender: lenderId,
        id_Borrower: borrowerId,
        isDone: 0,
        deletedAt: null
    }).then(function (result) {
        res.json({
            success: true,
            message: "Borrowing has been successfully established between two users which are friends."
        });
    }).catch(function (err) {
        if (err) {
            res.json({
                success: false,
                message: "Error while setting a borrowing."
            });
            throw err;
        }
    });
});

/**
 * Get all users's borrowings
 */
router.get("/get/:idUser", function (req, res, next) {
    User.findAll({
        //attributes: [], // Comment this to get user of 'idUser'
        where: { id: req.params.idUser, deletedAt: null },
        include: 
        [{ model: Product, as: 'borrowed' }, { model: Product, as: 'lent' }],
        limit: 20
    }).then(borrowingsList => {
        res.json(borrowingsList);
    }).catch(function (err) {
        if (err) {
            res.json({
                success: true,
                message: "Error while querying the user's borrowings."
            });
            throw err;
        }
    });
});

/**
 * Archives a borrowing
 */
router.get("/archives/add/:idProduct/:idLender/:idBorrower", function (req, res, next) {
    let productId = req.params.idProduct;
    let lenderId = req.params.idLender;
    let borrowerId = req.params.idBorrower;

    if (lenderId == borrowerId) {
        res.json({
            success: false,
            message: "Borrower id and lender id are the same."
        });
        return;
    }
    Borrow.update({
        isDone: 1
        }, {
        where: { 
            id_Product: productId,
            id_Lender: lenderId,
            id_Borrower: borrowerId,
            deletedAt: null
        }
    }).then(function (result) {
        res.json({
            success: true,
            message: "Borrowing has been successfully archived."
        });
    }).catch(function (err) {
        if (err) {
            res.json({
                success: false,
                message: "Error while archiving a borrowing."
            });
            throw err;
        }
    });
});

/**
 * Get all archived products from the user
 */
router.get("/archives/get/:idUser", function (req, res, next) {
    User.findAll({
        //attributes: [], // Comment this to get user of 'idUser'
        where: { id: req.params.idUser, deletedAt: null },        
        include: 
        [{ model: Product, as: 'borrowed', through: { where: { isDone: 1 } } }, { model: Product, as: 'lent', through: { where: { isDone: 1 } } }],
        limit: 20
    }).then(borrowingsList => {
        res.json(borrowingsList);
    }).catch(function (err) {
        if (err) {
            res.json({
                success: true,
                message: "Error while querying the user's archived products."
            });
            throw err;
        }
    });
});

/**
 * Delete a borrow 
 */
router.get("/delete/:idProduct/:idLender/:idBorrower", function (req, res, next) {
    Borrow.destroy({
        where:
        {
            id_Product: req.params.idProduct,
            id_Lender: req.params.idLender,
            id_Borrower: req.params.idBorrower,
            deletedAt: null
        }
    }).then(result => {
            res.json({
                success: true,
                message: "Borrow has been succesfully deleted."
            });
    }).catch(function (err) {
        if (err) {
            res.json({
                success: false,
                message: "Error while deleting a borrowing."
            });
            throw err;
        }
    });
});

module.exports = router;




    /*User.find({
        include: 
        [{ 
            model: User, as: 'friendWith', through: 
            { 
                where: { id_User: lenderId, id_Friend: borrowerId, isAccepted: 1, deletedAt: null }  
            }
        }]
    }).then(friendsList => {
        if(!friendsList) return;
        User.find({
            include: [{ model: Product, as: 'owns', through: { where: { id_User: lenderId, id_Product: productId, deletedAt: null } } }],
        }).then(libProducts => {
            res.json(libProducts);
            if (!libProducts) return;
            Borrow.upsert({
                id_Product: productId,
                id_Lender: lenderId,
                id_Borrower: borrowerId,
                deletedAt: null
            }).then(function (result) {
                res.json({
                    success: true,
                    message: "Borrowing has been successfully established between two users which are friends."
                });
            }).catch(function (err) {
                if (err) {
                    res.json({
                        success: false,
                        message: "Error while setting a borrowing."
                    });
                    throw err;
                }
            });
            return null;
        }).catch(function (err) {
            if (err) {
                res.json({
                    success: false,
                    message: "Error while verifying if an user possesses a product in his library."
                });
                throw err;
            }
        });
        return null;
    }).catch(function (err) {
        if (err) {
            res.json({
                success: false,
                message: "Error while verifying friendship between two users."
            });
            throw err;
        }
    });*/
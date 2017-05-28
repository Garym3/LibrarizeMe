'use strict';

var express = require("express");
var models = require("../models");
var router = express.Router();
var User = models.user;

/* USER REGION */

//Crée un utilisateur 
router.get("/add/:email/:password/:pseudo/:lastname/:firstname/:phone/:isSubscribed", function(req, res, next){
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
    }).then(function(result){
        res.json(result);
    }).catch(function(err){
        if(err) throw err;
    });
});

//Récupère la liste des utilisateurs
router.get("/", function(req,res){
    User.findAll({
        deletedAt: null,
        limit: 20
    }).then(function(result){
        res.send(result);
    }).catch(function(err){
        if(err) throw err;
    });
});

//Récupère l'utilisateur selon son identifiant
router.get("/get/id/:idUser", function(req,res){
    User.find({
        where: { id: req.params.idUser, deletedAt: null },
        limit: 20 
    }).then(function(result){
        res.send(result);
    }).catch(function(err){
        if(err) throw err;
    });
});

//Récupère l'utilisateur selon son identifiant
router.get("/get/pseudo/:pseudo", function(req,res){
    let val = req.params.pseudo;
    User.find({
        where: { pseudo: { $like: "%" + val + "%" }, deletedAt: null },
        limit: 20 
    }).then(function(result){
        res.send(result);
    }).catch(function(err){
        if(err) throw err;
    });
});

router.get('/changepasswd/:idUser/:newPasswd', function(req, res){
    User.find({
        where: { id: req.params.idUser }   
    }).then(function(result){
        if(result){
            User.update({
                password: req.params.newPasswd
            }, {
                where: { id: req.params.idUser, deletedAt: null }
            }).then(function(updateResult){
                if(updateResult){
                    res.send(JSON.stringify({
                        success: true,
                        message: "Password successfully updated."
                    }));
                }
            }).catch(function(updateErr){
                if(updateErr){
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
        
    }).catch(function(err){
        if(err){
            res.send(JSON.stringify({
                success: false,
                message: "Error while changing password."
            }));
            throw err;
        } 
    });
});

//Supprime un utilisateur selon son identifiant
router.get("/delete/:idUser", function(req,res){
    User.destroy({
        where: 
        { 
            id: req.params.idUser,
            deletedAt: null
        }
    }).then(function(result){
        res.json(result);
    }).catch(function(err){
        if(err) throw err;
    });
});

module.exports = router;
'use strict';

const express = require("express");
const models = require("../models");
const router = express.Router();
const User = models.user;
const Product = models.product;

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
    User.findAll().then(function(result){
        res.send(result);
    }).catch(function(err){
        if(err) throw err;
    });
});

//Récupère l'utilisateur selon son identifiant
router.get("/get/:user_id", function(req,res){
    User.find({
        where: {
            id: req.params.user_id
        },
    }).then(function(result){
        res.send(result);
    }).catch(function(err){
        if(err) throw err;
    });
});

//Supprime un utilisateur selon son identifiant
router.get("/delete/:user_id", function(req,res){
    User.destroy({
        where: { id: req.params.id }
    }).then(function(result){
        res.json(result);
    }).catch(function(err){
        if(err) throw err;
    });
});

router.get('/changepasswd/:iduser/:new', function(req, res){
    User.find({
        where: {
            id: req.params.iduser
        },
    }).then(function(result){
        if(result){
            User.update({
                password: req.params.new
            }, {
                where: {
                    id: req.params.iduser
                }
            }).then(function(updateresult){
                if(updateresult){
                    res.send(JSON.stringify({
                        success: true,
                        message: "Password successfully updated."
                    }));
                }
            }).catch(function(updateerr){
                if(updateerr){
                    res.send(JSON.stringify({
                        success: false,
                        message: "Error on updating password."
                    }));
                    throw err;
                } 
            });
        } else {
            res.send(JSON.stringify({
                success: false,
                message: "Error on changing password. No account for this ID."
            }))
        }        
        
    }).catch(function(err){
        if(err){
            res.send(JSON.stringify({
                success: false,
                message: "Error on changing password."
            }));
            throw err;
        } 
    });
})

module.exports = router;
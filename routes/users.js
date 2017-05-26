'use strict';

const express = require("express");
const models = require("../models");
const router = express.Router();
const User = models.User;

//Ajoute un utilisateur 
router.get("/add/:token/:email/:password/:pseudo/:lastname/:firstname/:phone/:isSubscribed", function(req, res, next){
    let token = req.params.token;
    let email = req.params.email;
    let password = req.params.password;
    let pseudo = req.params.pseudo;
    let lastname = req.params.lastname;
    let firstname = req.params.firstname;
    let phone = req.params.phone;
    let isSubscribed = req.params.isSubscribed;

    models.users.create({
        token: token,
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

//Affiche la liste des utilisateurs
router.get("/", function(req,res){
    models.users.findAll().then(function(result){
        res.json(result);
    }).catch(function(err){
        if(err) throw err;
    });
});

//Affiche l'utilisateur selon son identifiant
router.get("/get/:user_id", function(req,res){
    models.users.find({
        where: {
            id: req.params.user_id
        },
    }).then(function(result){
        res.json(result);
    }).catch(function(err){
        if(err) throw err;
    });
});

//Supprime un utilisateur selon son identifiant
router.get("/delete/:user_id", function(req,res){
    models.users.destroy({
        where: { id: req.params.user_id }
    }).then(function(result){
        res.json(result);
    }).catch(function(err){
        if(err) throw err;
    });
});

module.exports = router;
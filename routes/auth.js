'use strict';

const express = require("express");
const models = require("../models");
var fs = require('fs');
var jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/login/:acc/:passwd', function(req, res){
    models.user.find({
        where : {
            pseudo: req.params.acc,
            password: req.params.passwd
        }
    }).then(function(result){
        if(result){
            var passwd = fs.readFileSync('configuration/passphrasetoken').toString();
            var token = jwt.sign({ data: result.lastname+"_"+result.firstname+"_authOK" }, passwd, { expiresIn: '12h' });
            var print = JSON.stringify({
                token: token
            }, null, 3);
            res.send(print);
        } else {
            res.send(JSON.stringify({
                message: "Error on authentificating. Maybe wrong account ot password."
            }))
        }
    }).catch(function(err){
        if(err){
            res.send(JSON.stringify({
                message: "Error on authentificating."
            }));
            throw err;
        } 
    });    
});

router.get('/forgotpasswd/:email', function(req, res){
    models.user.find({
        where : {
            email: req.params.email
        }
    }).then(function(result){
        if(result){
            var newpasswd = generatePassword(10);

            models.user.update({
                password: newpasswd
            }, {
                where: {
                    email: req.params.email
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
            })

        } else {
            res.send(JSON.stringify({
                success: false,
                message: "Error on resetting password. No account on this email."
            }))
        }
    }).catch(function(err){
        if(err){
            res.send(JSON.stringify({
                success: false,
                message: "Error on ressting password."
            }));
            throw err;
        } 
    });
})

//Générateur de mot de passe aléatoire
function generatePassword(length) {
    var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
module.exports = router;
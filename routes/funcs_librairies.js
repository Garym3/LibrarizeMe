'use strict';

var models = require('../models');
var Library = models.library;

exports.verifyIfUserHasProduct = function(iduser, idproduct){
    Library.findAll({
        //attributes: [], // Comment this to get user of 'idUser'
        where: { id_User: iduser, id_Product: idproduct, deletedAt: null },
    }).then(libProducts => {
        if(libProducts.id_Product != null){
            console.log(libProducts);
            return true;
        } else {
            console.log("no");
            return false;
        }
    }).catch(function (err) {
        if (err) {
            return false;
        }
    });
}
'use strict';

var models = require('../models');
var Friendship = models.friendship;

exports.verifyFriendShip = function(idUser, idFriend){
    // Verify if thez are friends.
    var ret = false;
    Friendship.find({
        where: { id_User: idUser, id_Friend: idFriend, deletedAt: null },
    }).then(friendsList => {
        if (friendsList){
            console.log(friendsList);
            ret = true;
        } else {
            ret = false;
        }
    }).catch(function (err) {
        if (err) {
            return false;
        }
    });
    //////////////////////////////////////
    //////////////////////////////////////
    return ret;
}

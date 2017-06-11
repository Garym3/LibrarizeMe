'use strict';

var models = require('../models');
var Friendship = models.friendship;

exports.verifyFriendShip = function(idUser, idFriend){
    // Verify if thez are friends.
    Friendship.find({
        where: { id_User: idUser, id_Friend: idFriend, isAccepted: 1, deletedAt: null },
    }).then(friendsList => {
        if (friendsList){
            return true;
        } else {
            return false;
        }
    }).catch(function (err) {
        if (err) {
            return false;
        }
    });
}

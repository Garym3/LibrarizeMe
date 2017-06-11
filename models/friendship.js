/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('friendship', {
    id_User: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    id_Friend: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    isAccepted: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    }
  }, {
      tableName: 'friendship',
      timestamps: true,
      paranoid: true
    });
};
/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('friendship', {
    id_User: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    id_Friend: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  }, {
    tableName: 'friendship',
    timestamps: true,
    paranoid: true
  });
};

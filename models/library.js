/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('library', {
    id_User: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    id_Product: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'library',
    timestamps: true,
    paranoid: true
  });
};

/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('library', {
    id_User: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    id_Product: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'product',
        key: 'id'
      }
    }
  }, {
    tableName: 'library',
    timestamps: true
  });
};

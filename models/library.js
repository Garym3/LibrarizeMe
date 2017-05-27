/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('library', {
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'product',
        key: 'id'
      }
    }
  }, {
    freezeTableName: true,
    timestamps: true,
    underscored: true
  });
};

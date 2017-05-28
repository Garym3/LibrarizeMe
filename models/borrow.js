/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('borrow', {
    id_Product: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    id_Lender: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    id_Borrower: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'borrow',
    timestamps: true,
    paranoid: true
  });
};

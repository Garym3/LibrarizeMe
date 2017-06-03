/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('borrow', {
    id_Product: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      unique: false
    },
    id_Lender: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      unique: false
    },
    id_Borrower: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      unique: false
    }
  }, {
      tableName: 'borrow',
      timestamps: true,
      paranoid: true
    });
};

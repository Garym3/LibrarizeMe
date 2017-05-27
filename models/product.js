/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    libelle: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    ean13Code: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'product',
    timestamps: true
  });
};

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
    releaseDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    publisher: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    authors: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ean13Code: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: true
    },
    likes: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    views: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'product',
    timestamps: true,
    paranoid: true
  });
};

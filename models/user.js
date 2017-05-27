/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    pseudo: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    lastname: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    firstname: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    isSubscribed: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    }
  }, {
    tableName: 'user',
    timestamps: true,
    paranoid: true
  });
};

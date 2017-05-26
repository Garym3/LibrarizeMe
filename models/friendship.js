/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('friendship', {
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    friendId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'friendship'
  });
};

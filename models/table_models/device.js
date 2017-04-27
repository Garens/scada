/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('device', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    code: {
      type:  DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    data: {
      type: 'LONGBLOB',
      allowNull: true
    }
  }, {
    tableName: 'device'
  });
};

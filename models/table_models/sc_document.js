/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sc_document', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    pro_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    flag: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    desc: {
      type: DataTypes.INTEGER(2),
      allowNull: false
    },
    canvas: {
      type: 'LONGBLOB',
      allowNull: true
    },
    html: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isdiag: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    size: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'sc_document'
  });
};

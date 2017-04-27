/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_tunnel', {
    Id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    TunnelCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    DeptId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    RoadId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Lng: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Lat: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    PileName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    State: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    Icon: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Sort: {
      type: DataTypes.INTEGER(5),
      allowNull: true
    },
    UpStartStakeNum: {
      type: DataTypes.STRING,
      allowNull: true
    },
    UpEndStakeNum: {
      type: DataTypes.STRING,
      allowNull: true
    },
    UpLaneCount: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    DownStartStakeNum: {
      type: DataTypes.STRING,
      allowNull: true
    },
    DownEndStakeNum: {
      type: DataTypes.STRING,
      allowNull: true
    },
    DownLaneCount: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'tb_tunnel'
  });
};

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Gif extends Model {}

Gif.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "gif",
  }
);

module.exports = Gif;

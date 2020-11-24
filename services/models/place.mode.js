const sequelize = require("../../config/database");
const { DataTypes } = require("sequelize");

const PlaceModel = sequelize.define(
  "place",
  {
    place_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    city_name: {
      type: DataTypes.STRING(100),
    },
    place_name: {
      type: DataTypes.STRING(150),
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = PlaceModel
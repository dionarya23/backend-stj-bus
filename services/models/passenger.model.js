"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const PassengerModel = sequelize.define(
  "passengers",
  {
    passenger_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    schedule_bis_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "schedule_bis",
        key: "schedule_bis_id",
      },
    },
    passenger_name: {
      type: DataTypes.STRING(100),
    },
    passenger_age: {
      type: DataTypes.INTEGER,
    },
    seat_passenger: {
      type: DataTypes.STRING(10),
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = PassengerModel
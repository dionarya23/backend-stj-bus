"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const ScheduleBisModel = sequelize.define(
  "schedule_bis",
  {
    schedule_bis_id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    bis_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "bis",
        key: "bis_id",
      },
    },
    departure: {
      type: DataTypes.STRING(100),
    },
    destination: {
      type: DataTypes.STRING(100),
    },
    date_departure: {
      type: DataTypes.DATEONLY,
    },
    hour_departure: {
      type: DataTypes.DATE,
    },
    hour_arrived: {
      type: DataTypes.DATE,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    total_passenger: {
        type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = ScheduleBisModel;

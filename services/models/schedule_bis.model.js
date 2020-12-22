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
    rute: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = ScheduleBisModel;

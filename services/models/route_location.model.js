"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const RouteLocation = sequelize.define(
  "route_location",
  {
      route_location_id : {
          primaryKey: true,
          autoIncrement: true,
          type: DataTypes.INTEGER
      },
    schedule_bis_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "schedule_bis",
        key: "schedule_bis_id"
      }
    },
    place_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "place",
        key: "place_id"
      }
    },
    jam : {
        type: DataTypes.TIME
    }
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = RouteLocation;

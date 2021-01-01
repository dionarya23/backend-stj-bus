"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const DriverBusModel = sequelize.define(
  "driver_bus",
  {
    driver_bus_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    schedule_bis_id : {
      type: DataTypes.INTEGER,
      references: {
        model: "schedule_bis",
        key: "schedule_bis_id"
      }
    },
    user_id : {
        type: DataTypes.INTEGER,
        references: {
            model: "users",
            key: "user_id"
        }
    },
    photo_driver: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    konfirmasi_kantor: {
      type: DataTypes.ENUM("true", "false", "pending"),
      defaultValue: "pending"
    }
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = DriverBusModel
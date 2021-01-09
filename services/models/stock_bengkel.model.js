"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const StockBengkelModel = sequelize.define(
  "stock_bengkel",
  {
    id_stock_bengkel: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_bengkel: {
      type: DataTypes.INTEGER,
      references: {
        model: "bengkel",
        key: "id_bengkel",
      },
    },
    id_suku_cadang: {
      type: DataTypes.INTEGER,
      references: {
        model: "suku_cadang",
        key: "id_suku_cadang",
      },
    },
    total_suku_cadang: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = StockBengkelModel;

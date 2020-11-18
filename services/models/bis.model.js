"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const BisModel = sequelize.define(
  "bis",
  {
    bis_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type_bis: {
      type: DataTypes.ENUM("Eksekutif 32", "Patas AC", "Patas AC + Toilet"),
      defaultValue: "Eksekutif 32",
    },
    plat_nomor: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = BisModel;

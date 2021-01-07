"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const SukuCadangModel = sequelize.define(
  "suku_cadang",
  {
    id_suku_cadang: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_suku_cadang: {
      type: DataTypes.STRING(150),
    },
    total_suku_cadang: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = SukuCadangModel;

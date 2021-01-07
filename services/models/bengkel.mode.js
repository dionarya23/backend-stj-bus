"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const BengkelModel = sequelize.define(
  "bengkel",
  {
    id_bengkel: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_bengkel: {
      type: DataTypes.STRING(100),
    },
    alamat_bengkel: {
      type: DataTypes.STRING(255),
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "user_id",
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = BengkelModel

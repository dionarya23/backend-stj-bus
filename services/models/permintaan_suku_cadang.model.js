"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const PermintaanSukuCadangModel = sequelize.define(
  "permintaan_suku_cadang",
  {
    id_permintaan_suku_cadang: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_stock_bengkel: {
      type: DataTypes.INTEGER,
      references: {
        model: "stock_bengkel",
        key: "id_stock_bengkel",
      },
    },
    jumlah_permintaan: {
      type: DataTypes.INTEGER,
    },
    persetujuan: {
      type: DataTypes.ENUM("pending", "terkirim"),
      defaultValue: "pending"
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = PermintaanSukuCadangModel

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
      type: DataTypes.ENUM("Eksekutif 32", "Patas AC", "Patas AC Toilet"),
      defaultValue: "Eksekutif 32",
    },
    seri: {
      type: DataTypes.ENUM(
        "Seri A",
        "Seri E",
        "Seri C",
        "Seri K",
        "Seri J",
        "Seri Q",
        "Seri H",
        "Seri P",
        "Seri V",
        "Seri N",
        "Seri S",
        "Seri W",
        "Seri M",
        "Seri Y",
        "Seri Z",
        "Seri L",
        "Seri U",
        "Seri O",
        "Seri X",
        "Seri R",
        "Seri T",
        "Seri D",
        "Seri I",
        "Seri G",
        "Seri F",
        "Seri B"
      ),
      defaultValue: null,
      allowNull: true,
    },
    plat_nomor: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    jumlah_kursi: {
      type: DataTypes.INTEGER,
      defaultValue: 20,
    },
    harga_jatim: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true
    },
    harga_jateng: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true
    }
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = BisModel;

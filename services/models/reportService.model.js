"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const reportServiceModel = sequelize.define(
  "report_service",
  {
    id_report_service: {
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
    jumlah_yang_terpakai : {
        type: DataTypes.INTEGER,
    },
    description : {
        type: DataTypes.STRING(255)
    },
    id_bis: {
        type: DataTypes.INTEGER,
        references: {
            model: "bis",
            key: "bis_id"
        }
    }
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = reportServiceModel

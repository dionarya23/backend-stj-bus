"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const OrderModel = sequelize.define(
  "orders",
  {
    order_id: {
      type: DataTypes.STRING(100),
      primaryKey: true,
    },
    schedule_bis_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "schedule_bis",
        key: "schedule_bis_id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "user_id",
      },
    },
    total_price: {
      type: DataTypes.INTEGER,
    },
    email_order: {
      type: DataTypes.STRING(100),
    },
    phone_number_order: {
      type: DataTypes.STRING(15),
    },
    paid: {
      type: DataTypes.ENUM("terbayar", "belum_terbayar"),
      defaultValue: "belum_terbayar",
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = OrderModel;

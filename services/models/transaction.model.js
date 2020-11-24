"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const TransactionModel = sequelize.define("transactions", {
  transaction_id: {
    type: DataTypes.STRING("200"),
    primaryKey: true,
  },
  order_id: {
    type: DataTypes.STRING(100),
    references: {
      model: "orders",
      key: "order_id",
    },
  },
  transaction_status: {
    type: DataTypes.ENUM(
      "settlement",
      "capture",
      "pending",
      "deny",
      "cancel",
      "expire",
      "failure",
      "refund",
      "chargeback",
      "partial_refund",
      "partial_chargeback"
    ),
    defaultValue: "pending",
  },
  payment_type: {
    type: DataTypes.ENUM(
      "gopay",
      "bank_transfer",
      "echannel",
      "credit_card",
      "bca_klikpay",
      "cimb_clicks",
      "danamon_online",
      "bri_epay",
      "indomaret",
      "alfamart"
    ),
    allowNull: true,
    defaultValue: null,
  },
  invoice_number: {
    type: DataTypes.STRING,
    defaultValue: null,
    allowNull: true,
  },
});

module.exports = TransactionModel;

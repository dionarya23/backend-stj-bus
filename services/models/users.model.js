"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const UserModel = sequelize.define(
  "users",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstname: {
      type: DataTypes.STRING(50),
    },
    lastname: {
      type: DataTypes.STRING(50),
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    phone_number: {
      type: DataTypes.STRING(15),
    },
    user_type: {
      type: DataTypes.ENUM("customer", "mechanic", "driver", "admin"),
      defaultValue: "customer"
    },
    code_verif: {
      type: DataTypes.STRING(6),
      defaultValue: null
    },
    token_forgotPassword: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    id_google : {
      type: DataTypes.STRING,
      defaultValue: null
    }
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = UserModel;

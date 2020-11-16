"use strict";
const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../../config/database");

const UserModel = sequelize.define(
  "users",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
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
    avatar: {
        type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING,
    },
    phone_number: {
      type: DataTypes.STRING(15),
    },
    user_type: {
      type: DataTypes.ENUM,
      value: ["customer", "mechanic", "driver", "admin"],
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
    hooks: {
      beforeValidate: hashPassword,
    },
  }
);


const hashPassword = (user) => {
    if (user.changed("password")) {
        return bcrypt.hash(user.password, 10).then(function (password) {
            user.password = password;
          });
    }
}

module.exports = UserModel
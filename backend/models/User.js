// models/User.js
const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");
const bcrypt = require("bcryptjs");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        user.password_hash = await bcrypt.hash(user.password_hash, 10);
      },
      beforeUpdate: async (user) => {
        if (user.changed("password_hash")) {
          user.password_hash = await bcrypt.hash(user.password_hash, 10);
        }
      },
    },
  }
);

User.prototype.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password_hash);
};

module.exports = User;

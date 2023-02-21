const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("User", {
    first_name: {
      type: DataTypes.STRING,
      unique: false,
    },
    last_name: {
      type: DataTypes.STRING,
      unique: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    phone_number: {
      type: DataTypes.STRING,
    },
  });
};

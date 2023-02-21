const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Client", {
    first_name: {
      type: DataTypes.STRING,
      unique: false,
    },
    last_name: {
      type: DataTypes.STRING,
      unique: false,
    },
    photo: {
      type: DataTypes.TEXT,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    phone_number: {
      type: DataTypes.INTEGER,
    },
  });
};

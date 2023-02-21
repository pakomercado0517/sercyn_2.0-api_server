const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Transaction", {
    passenger: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["success", "pending", "pending to pay", "paid"],
    },
    date: {
      type: DataTypes.DATE,
    },
  });
};

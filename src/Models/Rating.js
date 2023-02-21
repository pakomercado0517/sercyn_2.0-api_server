const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Rating", {
    qualification: {
      type: DataTypes.INTEGER,
    },
    comment: {
      type: DataTypes.TEXT,
    },
  });
};

const { Op } = require("sequelize");
const { Company, Boat } = require("../db");

module.exports = {
  getCompanies: async (req, res) => {
    const company = await Company.findAll();
    res.status(200).json(company);
  },
};

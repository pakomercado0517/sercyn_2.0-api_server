const { Op } = require("sequelize");
const { User, Boat, Company, Price, Destination, Rating } = require("../db");

module.exports = {
  newBoat: async (req, res) => {
    const { id } = req.params;
    const { name, photo, capacity } = req.body;
    const company = await Company.findOne({ where: { id: id } });
    try {
      const boat = await Boat.findOne({ where: { name } });
      if (boat) {
        res.status(300).send("The Boat has been registered before");
      } else {
        const newBoat = await Boat.create({
          name,
          photo,
          capacity,
        });
        await company.addBoats(newBoat);
        res.status(200).json({ message: "Boat created on database", newBoat });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },
  getAllBoats: async (req, res) => {
    const getBoats = await Boat.findAll({
      include: [{ model: Price }, { model: Rating }],
    });
    res.status(200).json(getBoats);
  },
  getByAscName: async (req, res) => {
    try {
      const ascName = await Boat.findAll({
        order: [["name", "ASC"]],
        include: [{ model: Rating }],
      });
      res.status(200).json(ascName);
    } catch (error) {
      res.stataus(400).json({ message: error.message });
    }
  },
  getByDescName: async (req, res) => {
    try {
      const ascName = await Boat.findAll({
        order: [["name", "DESC"]],
        include: [{ model: Rating }],
      });
      res.status(200).json(ascName);
    } catch (error) {
      res.stataus(400).json({ message: error.message });
    }
  },
  getByDestination: async (req, res) => {
    try {
      const { name } = req.query;
      const destinationName = await Price.findAll({
        include: [
          { model: Destination, where: { name } },
          { model: Boat, include: [{ model: Rating }] },
        ],
      });
      res.status(200).json(destinationName);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getById: async (req, res) => {
    const { id } = req.params;
    try {
      const findedBoat = await Boat.findOne({
        where: { id },
        include: [
          { model: Company },
          { model: Rating },
          { model: Price, include: [{ model: Destination }] },
        ],
      });
      res.status(200).json(findedBoat);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

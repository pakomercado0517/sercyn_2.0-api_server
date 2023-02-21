const { Op } = require("sequelize");
const { Rating, Boat, Client } = require("../db");

module.exports = {
  getRating: async (req, res) => {
    try {
      const allRatings = await Rating.findAll({
        include: [{ model: Boat }, { model: Client }],
      });
      res.status(200).json(allRatings);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getByBestQaulification: async (req, res) => {
    try {
      const rating = await Rating.findAll({
        where: {
          qualification: {
            [Op.between]: [4, 5],
          },
        },
        include: [{ model: Boat }, { model: Client }],
        order: [["id", "DESC"]],
      });
      res.status(200).json(rating);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  newRating: async (req, res) => {
    const { qualification, comment, clientId } = req.body;
    const { id } = req.params;
    try {
      const boat = await Boat.findOne({
        where: { id },
      });
      const client = await Client.findOne({ where: { id: clientId } });
      const newRating = await Rating.create({ qualification, comment });
      await boat.addRatings(newRating);
      await client.addRatings(newRating);
      res.status(200).json({ message: "Rating created", newRating });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

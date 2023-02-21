const { Price, Destination, Boat, User, Company, Rating } = require("../db");

module.exports = {
  getPrices: async (req, res) => {
    try {
      const price = await Price.findAll({
        include: [
          { model: Destination },
          {
            model: Boat,
            include: [{ model: Company, include: [{ model: User }] }],
          },
        ],
      });
      res.status(200).json(price);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getMoreExpensive: async (req, res) => {
    const { name } = req.query;
    try {
      if (name) {
        const filterPrice = await Price.findAll({
          include: [
            { model: Boat, include: [{ model: Rating }] },
            { model: Destination, where: { name } },
          ],
          order: [["price", "DESC"]],
        });
        res.status(200).json(filterPrice);
      } else {
        const allExpensivePrices = await Price.findAll({
          include: [
            { model: Destination },
            { model: Boat, include: [{ model: Rating }] },
          ],
          order: [["price", "DESC"]],
        });
        res.status(200).json(allExpensivePrices);
      }
    } catch (error) {
      res.status(400).json(error.message);
    }
  },
  getMoreCheap: async (req, res) => {
    const { name } = req.query;
    try {
      if (name) {
        const filterPrice = await Price.findAll({
          include: [
            { model: Boat, include: [{ model: Rating }] },
            { model: Destination, where: { name } },
          ],
          order: [["price", "ASC"]],
        });
        res.status(200).json(filterPrice);
      } else {
        const allExpensivePrices = await Price.findAll({
          include: [
            { model: Destination },
            { model: Boat, include: [{ model: Rating }] },
          ],
          order: [["price", "ASC"]],
        });
        res.status(200).json(allExpensivePrices);
      }
    } catch (error) {
      res.status(400).json(error.message);
    }
  },
  newPrice: async (req, res) => {
    const { price, destination } = req.body;
    const { id } = req.params;
    console.log("destination", destination);
    try {
      const isDestination = await Destination.findOne({
        where: { name: destination },
      });
      const isBoat = await Boat.findOne({ where: { id } });
      const newPrice = await Price.create({ price });
      await isBoat.addPrices(newPrice);
      await isDestination.addPrices(newPrice);
      res
        .status(200)
        .json({ message: "Price created with successfull", newPrice });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

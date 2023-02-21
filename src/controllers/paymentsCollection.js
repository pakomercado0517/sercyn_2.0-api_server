const { PaymentsCollection } = require("../db");

module.exports = {
  getCollections: async (req, res) => {
    try {
      const collection = await PaymentsCollection.findAll();
      res.status(200).json(collection);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  updateCollection: async (req, res) => {
    const {
      preference_id,
      status,
      merchant_order_id,
      payment_id,
      payment_type,
      site_id,
      price,
    } = req.body;
    try {
      console.log("preference_id", preference_id);
      const putCollection = await PaymentsCollection.update(
        {
          status,
          merchant_order_id,
          payment_id,
          payment_type,
          site_id,
          price,
        },
        { where: { preference_id } }
      );
      res.status(200).json(putCollection);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getCollectionById: async (req, res) => {
    const { preference_id } = req.body;
    try {
      const collection = await PaymentsCollection.findOne({
        where: { preference_id },
      });
      res.status(200).json(collection);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  updateCollectionStatus: async (req, res) => {
    const { preference_id, status } = req.body;
    try {
      const updatedCollection = await PaymentsCollection.update(
        {
          status,
        },
        {
          where: { preference_id },
        }
      );
      res.status(200).json(updatedCollection);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

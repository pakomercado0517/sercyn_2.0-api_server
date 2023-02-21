const {
  Transaction,
  Destination,
  Client,
  Boat,
  Price,
  PaymentsCollection,
} = require("../db");

module.exports = {
  newTransaction: async (req, res) => {
    const { priceId, clientId, passenger, status, price, date } = req.body;
    const { id } = req.params;
    try {
      //Buscamos el destino referido al precio seleccionado
      const findDestination = await Price.findOne({
        where: { id: priceId },
        include: [{ model: Destination }, { model: Boat }],
      });
      const findClient = await Client.findOne({ where: { id: clientId } });
      //Create a new PaymentsCollections...
      const newCollection = await PaymentsCollection.create({
        preference_id: id,
        price,
      });

      //We'll create a transaction, no forget his status is a enum with: "success", "fail", "pending to pay" and "paid"
      const newTransaction = await Transaction.create({
        passenger,
        status,
        date,
      });
      await findDestination.Boat.addTransactions(newTransaction);
      await findClient.addTransactions(newTransaction);
      await findDestination.Destination.addTransactions(newTransaction);
      await newTransaction.setPaymentsCollection(newCollection);
      res.status(200).json({ message: "Transaction created!", newTransaction });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getTransactions: async (req, res) => {
    try {
      const allTransactions = await Transaction.findAll({
        include: [
          { model: Boat },
          { model: Client },
          { model: Destination },
          { model: PaymentsCollection },
        ],
      });
      res.status(200).json(allTransactions);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  updateTransaction: async (req, res) => {
    const { id } = req.body;
  },
};

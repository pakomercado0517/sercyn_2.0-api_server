const {
  Client,
  Transaction,
  Boat,
  Destination,
  Company,
  PaymentsCollection,
} = require("../db");

module.exports = {
  getClients: async (req, res) => {
    const getClients = await Client.findAll();
    console.log("cookies", req.session);
    res.status(200).json(getClients);
  },
  newClient: async (req, res, next) => {
    const { first_name, last_name, email, photo, password, phone_number } =
      req.body;
    try {
      const searchClient = await Client.findOne({ where: { email } });
      if (searchClient) {
        res.status(300).send("The user has been registered");
      } else {
        const newClient = await Client.create({
          first_name,
          last_name,
          photo,
          email,
          password,
          phone_number,
        });
        res.status(200).json(newClient);
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },
  getClientById: async (req, res) => {
    const { id } = req.params;

    try {
      const client = await Client.findOne({
        where: { id },
        include: [
          {
            model: Transaction,
            include: [
              { model: Boat, include: [{ model: Company }] },
              { model: Destination },
              { model: PaymentsCollection },
            ],
          },
        ],
        order: [[Transaction, "id", "DESC"]],
      });
      res.status(200).json(client);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
};

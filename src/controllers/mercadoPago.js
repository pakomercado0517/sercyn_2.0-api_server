const mercadopago = require("mercadopago");
const { Transaction } = require("../db");
const { MERCADO_PAGO_ACCESS_TOKEN } = process.env;
mercadopago.configure({
  access_token: MERCADO_PAGO_ACCESS_TOKEN,
});

const { FRONT_HOST, BACK_HOST } = process.env;

const constants = {
  frontHost: FRONT_HOST,
  backHost: BACK_HOST,
};

module.exports = {
  newTransactions: async (req, res) => {
    const { transactionId } = req.body;
    const preference = {
      items: [{ ...req.body }],
      back_urls: {
        success: `${constants.frontHost}/payment/response`,
        failure: `${constants.frontHost}/payment/response`,
        pending: `${constants.frontHost}/payment/response`,
      },
      metadata: {
        transactionId,
      },
    };
    try {
      const result = await mercadopago.preferences.create(preference);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  responseTransactions: async (req, res) => {
    const paymentResult = req.params;
    console.log("paymentResult", typeof paymentResult);
  },
};

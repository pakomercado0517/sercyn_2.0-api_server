const jwt = require("jsonwebtoken");
const { Client } = require("../db");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;

module.exports = {
  clientLogin: async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const client = await Client.findOne({ where: { email } });
      const passwordCorrect =
        client === null ? false : bcrypt.compare(password, client.password);

      if (!(client && passwordCorrect)) {
        res.status(401).json({ error: "Invalid email or password" });
      }

      const userForToken = {
        id: client.id,
        email: client.email,
      };

      const token = jwt.sign(userForToken, JWT_SECRET, {
        expiresIn: 60 * 60 * 24 * 2,
      });

      res.send({
        message: "Logged",
        data: req.user,
        token,
        cookie: req.session,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

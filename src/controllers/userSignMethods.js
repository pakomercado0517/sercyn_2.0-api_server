const jwt = require("jsonwebtoken");
const { User } = require("../db");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;

module.exports = {
  userLogin: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      const passwordCorrect =
        user === null ? false : bcrypt.compare(password, user.password);

      if (!(user && passwordCorrect)) {
        res.status(401).json({ error: "Invalid email or password" });
      }
      const userForToken = {
        id: user.id,
        email: user.email,
      };

      const token = jwt.sign(userForToken, JWT_SECRET, {
        expiresIn: 60 * 60 * 24 * 2,
      });

      res.status(200).json({
        message: "User Logged",
        data: req.user,
        token,
        cookie: req.session,
      });
    } catch (error) {
      console.log("error", error);
      res.status(400).json({ message: error });
    }
  },
};

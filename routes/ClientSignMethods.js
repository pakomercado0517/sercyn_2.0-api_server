const { Router } = require("express");
const router = Router();
const passport = require("passport");
const clientSignFunctions = require("../src/controllers/clientSignMethods");
//POST methods

//Client sign methods...
router.post(
  "/client/signup",
  passport.authenticate("local_client-signup", { failureFlash: false }),
  async (req, res, next) => {
    res.status(200).json(req.user);
  }
);
router.post(
  "/client/login",
  passport.authenticate("local_client-login", { failureFlash: false }),
  clientSignFunctions.clientLogin
);

//GET methods

module.exports = router;

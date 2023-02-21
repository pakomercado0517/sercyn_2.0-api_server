const { Router } = require("express");
const router = Router();
const clientFunctions = require("../src/controllers/client");
const passport = require("passport");

//GET methods
router.get("/", clientFunctions.getClients);
router.get("/:id", clientFunctions.getClientById);
// POST methods

module.exports = router;

const { Router } = require("express");
const router = Router();
const transactionFunctions = require("../src/controllers/transaction");

//POST methods
router.post("/:id", transactionFunctions.newTransaction);
//GET methods
router.get("/", transactionFunctions.getTransactions);
// PUT methods

module.exports = router;

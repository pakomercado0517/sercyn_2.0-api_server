const { Router } = require("express");
const router = Router();
const priceFunctions = require("../src/controllers/price");

//GET Methods
router.get("/", priceFunctions.getPrices);
router.get("/getMoreExpensive", priceFunctions.getMoreExpensive);
router.get("/getMoreCheap", priceFunctions.getMoreCheap);

//POST Methods
router.post("/:id", priceFunctions.newPrice);
module.exports = router;

const { Router } = require("express");
const router = Router();
const collectionFunctions = require("../src/controllers/paymentsCollection");

// GET methods
router.get("/", collectionFunctions.getCollections);
router.get("/getCollection/", collectionFunctions.getCollectionById);
// POST methods
//PUT methods
router.put("/update/collection", collectionFunctions.updateCollection);
router.put(
  "/update/collection/status",
  collectionFunctions.updateCollectionStatus
);

module.exports = router;

const { Router } = require("express");
const router = Router();
const RatingFunctions = require("../src/controllers/rating");

router.post("/:id", RatingFunctions.newRating);
router.get("/", RatingFunctions.getRating);
router.get("/bestRating", RatingFunctions.getByBestQaulification);

module.exports = router;

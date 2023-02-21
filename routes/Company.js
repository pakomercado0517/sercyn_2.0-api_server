const { Router } = require("express");
const router = Router();
const companyFunctions = require("../src/controllers/company");

router.get("/", companyFunctions.getCompanies);

module.exports = router;

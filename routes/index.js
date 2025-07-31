const express = require("express");
const router = express.Router();
const getHome = require("../controllers/index");

router.get("/", getHome);
//router.use("/api-docs", require("./docs/swagger")); For implementing swagger
//router.use("/contacts", require("./contacts")); Example of a route

module.exports = router;

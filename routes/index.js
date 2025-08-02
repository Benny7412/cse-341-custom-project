const express = require("express");
const router = express.Router();
const getHome = require("../controllers/index");

router.get("/", getHome);
//router.use("/cats", require("./cats"));
//router.use("/catBreeds", require("./catBreeds"));

module.exports = router;

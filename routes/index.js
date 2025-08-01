const express = require("express");
const router = express.Router();
const getHome = require("../controllers/index");

router.get("/", getHome);
router.use("/cats", require("./cats"));
router.use("/cats", require("./catBreeds"));
//router.use("/api-docs", require("./docs/swagger")); For implementing swagger


module.exports = router;

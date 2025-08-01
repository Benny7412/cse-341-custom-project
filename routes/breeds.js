const express = require("express");
const router = express.Router();
const breedsController = require("../controllers/breeds");
const { validateObjectId } = require("../utilities");

router.get("/", breedsController.getAll);
router.get("/:id", validateObjectId, breedsController.getSingle);
router.get("", breedsController.create);
router.get("/:id", validateObjectId, breedsController.update);
router.get("/:id", validateObjectId, breedsController.delete);

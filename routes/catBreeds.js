const express = require('express');
const router = express.Router();
const breedsController = require('../controllers/catBreeds');
const { validateObjectId, validateCatBreed } = require('../utilities');

// Return all breeds
router.get('/', (req, res) => {
    return breedsController.getAllBreeds(req, res);
});

// Return single breed
router.get('/:id', validateObjectId, (req, res) => {
    return breedsController.getBreedById(req, res);
});

// Create new breed
router.post('/', validateCatBreed, breedsController.createBreed);

// Update existing breed
router.put('/:id', validateObjectId, validateCatBreed, breedsController.updateBreed);

// Delete breed
router.delete('/:id', validateObjectId, breedsController.deleteBreed);

module.exports = router;
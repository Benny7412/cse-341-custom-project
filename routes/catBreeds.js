const express = require('express');
const router = express.Router();
const breedsController = require('../controllers/catBreeds');

// Return all breeds
router.get('/', (req, res) => {
    return breedsController.getAllBreeds(req, res);
});

// Return single breed
router.get('/:id', (req, res) => {
    return breedsController.getBreedById(req, res);
});

// Create new breed
router.post('/', breedsController.createBreed);

// Update existing breed
router.put('/:id', breedsController.updateBreed);

// Delete breed
router.delete('/:id', breedsController.deleteBreed);

module.exports = router;
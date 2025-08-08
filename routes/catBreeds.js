const express = require('express');
const router = express.Router();
const breedsController = require('../controllers/catBreeds');
const { validateObjectId, validateCatBreed } = require('../utilities');
const { isAuthenticated } = require('../utilities/authenticate');

// Return all breeds
router.get('/', (req, res) => {
    return breedsController.getAllBreeds(req, res);
});
// Return single breed
router.get('/:id', validateObjectId, (req, res) => {
    return breedsController.getBreedById(req, res);
});
// Create new breed
router.post('/', isAuthenticated, validateCatBreed, breedsController.createBreed);

// Update existing breed
router.put('/:id', isAuthenticated, validateObjectId, validateCatBreed, breedsController.updateBreed);

// Delete breed
router.delete('/:id', isAuthenticated, validateObjectId, breedsController.deleteBreed);

module.exports = router;
const express = require('express');
const router = express.Router();
const catsController = require('../controllers/cats');
const { validateObjectId, validateCat} = require('../utilities');
const { isAuthenticated } = require('../utilities/authenticate');


// Return all cats
router.get('/', (req, res) => {
    return catsController.getAllCats(req, res);
});

// Return single cat
router.get('/:id', validateObjectId, (req, res) => {
    return catsController.getCatById(req, res);
});

// Create new cat
router.post('/', isAuthenticated, validateCat, catsController.createCat);

// Update existing cat
router.put('/:id', isAuthenticated, validateObjectId, validateCat, catsController.updateCat);

// Delete cat
router.delete('/:id', isAuthenticated, validateObjectId, catsController.deleteCat);

module.exports = router;
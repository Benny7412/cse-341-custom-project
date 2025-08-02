const express = require('express');
const router = express.Router();
const catsController = require('../controllers/cats');
const { validateObjectId, validateCat } = require('../utilities');

// #swagger.tags = ['Cats']
// Return all cats
router.get('/', (req, res) => {
    /* #swagger.tags = ['Cats']
       #swagger.description = 'Get all cats'
    */
    return catsController.getAllCats(req, res);
});

// Return single cat
router.get('/:id', validateObjectId, (req, res) => {
    return catsController.getCatById(req, res);
});

// Create new cat
router.post('/', validateCat, catsController.createCat);

// Update existing cat
router.put('/:id', validateObjectId, validateCat, catsController.updateCat);

// Delete cat
router.delete('/:id', validateObjectId, catsController.deleteCat);

module.exports = router;
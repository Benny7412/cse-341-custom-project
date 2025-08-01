const express = require('express');
const router = express.Router();
const catsController = require('../controllers/cats');

// #swagger.tags = ['Cats']
// Return all cats
router.get('/', (req, res) => {
    /* #swagger.tags = ['Cats']
       #swagger.description = 'Get all cats'
    */
    return catsController.getAllCats(req, res);
});

// Return single cat
router.get('/:id', (req, res) => {

    return catsController.getCatById(req, res);
});

// Create new cat
router.post('/', catsController.createCat);

// Update existing cat
router.put('/:id', catsController.updateCat);

// Delete cat
router.delete('/:id', catsController.deleteCat);

module.exports = router;
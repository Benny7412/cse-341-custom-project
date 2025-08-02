const { ObjectId } = require('mongodb');
const { initDb, getDb } = require('../data/database');

// GET /breeds – list all breeds
async function getAllBreeds(req, res) {
  try {
    await initDb();
    const db = getDb();
    const breeds = await db.collection('catBreeds').find().toArray();
    res.status(200).json(breeds);
  } catch (err) {
    console.error('Error retrieving breeds:', err);
    res.status(500).json({ error: 'An error occurred fetching breeds' });
  }
}

// GET /breeds/:id – get a single breed by id
async function getBreedById(req, res) {
  try {
    const { id } = req.params;
    await initDb();
    const db = getDb();
    const breed = await db.collection('catBreeds').findOne({ _id: new ObjectId(id) });
    if (!breed) {
      return res.status(404).json({ error: 'Breed not found' });
    }
    res.status(200).json(breed);
  } catch (err) {
    console.error('Error retrieving breed:', err);
    res.status(500).json({ error: 'An error occurred fetching the breed' });
  }
}

// POST /breeds – create new breed
async function createBreed(req, res) {
  try {
    const body = req.body;
    await initDb();
    const db = getDb();
    const result = await db.collection('catBreeds').insertOne(body);
    const created = await db.collection('catBreeds').findOne({ _id: result.insertedId });
    res.status(201).json(created);
  } catch (err) {
    console.error('Error creating breed:', err);
    res.status(500).json({ error: 'An error occurred creating the breed' });
  }
}

// PUT /breeds/:id – update existing breed
async function updateBreed(req, res) {
  try {
    const { id } = req.params;
    const body = req.body;
    await initDb();
    const db = getDb();
    const result = await db.collection('catBreeds').updateOne({ _id: new ObjectId(id) }, { $set: body });
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Breed not found' });
    }
    const updated = await db.collection('catBreeds').findOne({ _id: new ObjectId(id) });
    res.status(200).json(updated);
  } catch (err) {
    console.error('Error updating breed:', err);
    res.status(500).json({ error: 'An error occurred updating the breed' });
  }
}

// DELETE /breeds/:id – remove breed
async function deleteBreed(req, res) {
  try {
    const { id } = req.params;
    await initDb();
    const db = getDb();
    const result = await db.collection('catBreeds').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Breed not found' });
    }
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting breed:', err);
    res.status(500).json({ error: 'An error occurred deleting the breed' });
  }
}

module.exports = {
  getAllBreeds,
  getBreedById,
  createBreed,
  updateBreed,
  deleteBreed,
};
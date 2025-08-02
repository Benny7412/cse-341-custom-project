const { ObjectId } = require('mongodb');
const { initDb, getDb } = require('../data/database');



function validateBreed(body) {
  if (!body || typeof body !== 'object') {
    return 'Request body is missing or malformed';
  }
  const required = [
    'breed',
    'description',
    'avgLifespan',
    'avgLength',
    'avgWeightMale',
    'avgWeightFemale',
    'imageURL',
  ];
  for (const key of required) {
    if (!(key in body)) {
      return `Missing required field: ${key}`;
    }
  }
  if (typeof body.breed !== 'string' || !body.breed.trim()) return 'Breed must not be an empty string';
  if (typeof body.description !== 'string' || !body.description.trim()) return 'Description must not be an empty string';
  if (typeof body.avgLifespan !== 'string' && typeof body.avgLifespan !== 'number') return 'avgLifespan must be a string or number';
  if (typeof body.avgLength !== 'string' && typeof body.avgLength !== 'number') return 'avgLength must be a string or number';
  if (typeof body.avgWeightMale !== 'string' && typeof body.avgWeightMale !== 'number') return 'avgWeightMale must be a string or number';
  if (typeof body.avgWeightFemale !== 'string' && typeof body.avgWeightFemale !== 'number') return 'avgWeightFemale must be a string or number';
  if (typeof body.imageURL !== 'string' || !body.imageURL.trim()) return 'imageURL must not be an empty string';
  return null;
}

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
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid breed id' });
    }
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
    const error = validateBreed(body);
    if (error) {
      return res.status(400).json({ error });
    }
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
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid breed id' });
    }
    const body = req.body;
    const error = validateBreed(body);
    if (error) {
      return res.status(400).json({ error });
    }
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
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid breed id' });
    }
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
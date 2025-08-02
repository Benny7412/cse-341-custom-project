const { ObjectId } = require('mongodb');
const { initDb, getDb } = require('../data/database');

// Simple validation to ensure required fields are present and of the right type
function validateCat(body) {
  if (!body || typeof body !== 'object') {
    return 'Request body is missing or malformed';
  }
  const required = [
    'name',
    'birthday',
    'breed',
    'gender',
    'isVaccinated',
    'weight',
    'imageURL',
  ];
  for (const key of required) {
    if (!(key in body)) {
      return `Missing required field: ${key}`;
    }
  }
  if (typeof body.name !== 'string' || !body.name.trim()) return 'Name must not be empty';
  if (typeof body.breed !== 'string' || !body.breed.trim()) return 'Breed must not be empty';
  if (typeof body.gender !== 'string' || !body.gender.trim()) return 'Gender must not be empty';
  if (typeof body.isVaccinated !== 'boolean') return 'isVaccinated must be a boolean';
  if (typeof body.weight !== 'string' && typeof body.weight !== 'number') return 'Weight must be a string or number';
  if (typeof body.birthday !== 'string' || !body.birthday.trim()) return 'Birthday must not be empty';
  if (typeof body.imageURL !== 'string' || !body.imageURL.trim()) return 'imageURL must not be empty';
  return null;
}

// GET /cats – list all cats
async function getAllCats(req, res) {
  try {
    await initDb();
    const db = getDb();
    const cats = await db.collection('cats').find().toArray();
    res.status(200).json(cats);
  } catch (err) {
    console.error('Error retrieving cats:', err);
    res.status(500).json({ error: 'An error occurred fetching cats' });
  }
}

// GET /cats/:id – get a single cat by id
async function getCatById(req, res) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid cat id' });
    }
    await initDb();
    const db = getDb();
    const cat = await db.collection('cats').findOne({ _id: new ObjectId(id) });
    if (!cat) {
      return res.status(404).json({ error: 'Cat not found' });
    }
    res.status(200).json(cat);
  } catch (err) {
    console.error('Error retrieving cat:', err);
    res.status(500).json({ error: 'An error occurred fetching the cat' });
  }
}

// POST /cats – create a new cat
async function createCat(req, res) {
  try {
    const body = req.body;
    const error = validateCat(body);
    if (error) {
      return res.status(400).json({ error });
    }
    await initDb();
    const db = getDb();
    const result = await db.collection('cats').insertOne(body);
    const created = await db.collection('cats').findOne({ _id: result.insertedId });
    res.status(201).json(created);
  } catch (err) {
    console.error('Error creating cat:', err);
    res.status(500).json({ error: 'An error occurred creating the cat' });
  }
}

// PUT /cats/:id – update an existing cat
async function updateCat(req, res) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid cat id' });
    }
    const body = req.body;
    const error = validateCat(body);
    if (error) {
      return res.status(400).json({ error });
    }
    await initDb();
    const db = getDb();
    const result = await db.collection('cats').updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Cat not found' });
    }
    const updated = await db.collection('cats').findOne({ _id: new ObjectId(id) });
    res.status(200).json(updated);
  } catch (err) {
    console.error('Error updating cat:', err);
    res.status(500).json({ error: 'An error occurred updating the cat' });
  }
}

// DELETE /cats/:id – remove a cat
async function deleteCat(req, res) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid cat id' });
    }
    await initDb();
    const db = getDb();
    const result = await db.collection('cats').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Cat not found' });
    }
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting cat:', err);
    res.status(500).json({ error: 'An error occurred deleting the cat' });
  }
}

module.exports = {
  getAllCats,
  getCatById,
  createCat,
  updateCat,
  deleteCat,
};

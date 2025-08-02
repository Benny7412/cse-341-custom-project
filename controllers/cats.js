const { ObjectId } = require('mongodb');
const { initDb, getDb } = require('../data/database');

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
    const body = req.body;
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

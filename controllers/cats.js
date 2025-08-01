const mongodb = require("../routes/data/database");
const ObjectId = require("mongodb").ObjectId;

const currentDatabase = "CSE341-Project-2"; 
const currentCollection = "cats";

const getAll = async (req, res) => {
  //#swagger.tags=['Contacts']
  const contacts = await mongodb
    .getDatabase()
    .db(currentDatabase)
    .collection("contacts")
    .find()
    .toArray();
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(contacts);
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Contacts']
  const userId = new ObjectId(req.params.id);
  const contact = await mongodb
    .getDatabase()
    .db(currentDatabase)
    .collection("contacts")
    .find({ _id: userId });

  contact.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users[0]);
  });
};

const createContact = async (req, res) => {
  //#swagger.tags=['Contacts']
  //required fields: firstName, lastName, email, favoriteColor, birthday
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };

  //acquire database and insert contact
  const response = await mongodb
    .getDatabase()
    .db(currentDatabase)
    .collection("contacts")
    .insertOne(contact);
  //if contact is created, send success message
  if (response.acknowledged) {
    res.status(201).json(response.insertedId);
  } else {
    //send error message
    res
      .status(500)
      .json(response.error || "Error occurred while creating the contact");
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
    const result = await db
      .collection('cats')
      .updateOne({ _id: new ObjectId(id) }, { $set: body });
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
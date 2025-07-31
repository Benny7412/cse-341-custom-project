const mongodb = require("../routes/data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Contacts']
  const contacts = await mongodb
    .getDatabase()
    .db("project1")
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
    .db("project1")
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
    .db("project1")
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
};

const updateContact = async (req, res) => {
  //#swagger.tags=['Contacts']
  const userId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb
    .getDatabase()
    .db("project1")
    .collection("contacts")
    .replaceOne({ _id: userId }, contact);
  //check if contact is updated
  if (response.modifiedCount > 0) {
    res.status(204).send();
    console.log("Contact updated!");
  } else {
    res
      .status(500)
      .json(response.error || "Error occurred while updating the contact");
  }
};

const deleteContact = async (req, res) => {
  //#swagger.tags=['Contacts']
  const userId = new ObjectId(req.params.id);

  // Get the contact to be deleted
  const contactToDelete = await mongodb
    .getDatabase()
    .db("project1")
    .collection("contacts")
    .findOne({ _id: userId });
  if (!contactToDelete) {
    return res.status(404).json({ message: "Contact not found" });
  }

  const response = await mongodb
    .getDatabase()
    .db("project1")
    .collection("contacts")
    .deleteOne({ _id: userId });

  if (response.deletedCount > 0) {
    console.log(
      `${contactToDelete.firstName} ${contactToDelete.lastName} deleted!`
    );
    //send success message with contact details
    res.status(200).json({
      message: `${contactToDelete.firstName} ${contactToDelete.lastName} deleted!`,
    });
  } else {
    res.status(500).json("Error occurred while deleting the contact");
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
};

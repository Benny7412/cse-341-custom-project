const { MongoClient } = require('mongodb');

let database;

const initDb = async () => {
  if (database) {
    console.log("Database already initialized");
    return database;
  }
  try {
    database = await MongoClient.connect(process.env.MONGODB_URI);
    return database;
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    throw err;
  }
};


function getDb() {
  const dbName = process.env.DB_NAME || 'CSE341-Project-2';
  return database.db(dbName);
}

module.exports = { initDb, getDb };
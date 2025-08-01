// TO INSERT DATA RUN: node insertData.js

const dotenv = require("dotenv");
dotenv.config();
const { MongoClient } = require("mongodb");

// BUILDING INSERT DATA
const catData = [
  {
    name: "Gandalf the Grey",
    birthday: "4/15/2015",
    breed: "American Shorthair",
    gender: "Male",
    isVaccinated: true,
    weight: "11.0",
    imageURL: "placeholder.jpg",
  },
  {
    name: "Chuck Norris",
    birthday: "3/20/2013",
    breed: "Bengal",
    gender: "Male",
    isVaccinated: true,
    weight: "10.3",
    imageURL: "placeholder.jpg",
  },
  {
    name: "Mochi",
    birthday: "6/18/2016",
    breed: "American Shorthair + Siamese",
    gender: "Female",
    isVaccinated: true,
    weight: "8.8",
    imageURL: "placeholder.jpg",
  },
];

//EVERYTHING IN LBS AND INCHES

const catBreedData = [
  {
    breed: "American Shorthair",
    description: "Black–silver blotched tabby American Shorthair",
    avgLifespan: "15-20",
    avgLength: "12-15",
    avgWeightMale: "13.0",
    avgWeightFemale: "9.0",
    imageURL: "placeholder.jpg",
  },
  {
    breed: "Bengal",
    description:
      "Shiny spotted coating. Most commonly brown and shorthaired. Energetic and smart",
    avgLifespan: "<15",
    avgLength: "<18",
    avgWeightMale: "12.0",
    avgWeightFemale: "10.0",
    imageURL: "placeholder.jpg",
  },
  {
    breed: "Siamese",
    description:
      "White with brown accents, usually on the face, legs, and tail. Blue almond shaped eye, Friendly, Loud",
    avgLifespan: "<12",
    avgLength: "<24",
    avgWeightMale: "13.0",
    avgWeightFemale: "10.0",
    imageURL: "placeholder.jpg",
  },
];

// INSERT DATA
async function run() {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db("CSE341-Project-2");

    // CLEAR ALL PREVIOUS CAT DATA
    await db.collection("cats").deleteMany({});

    // INSERT NEW CAT DATA
    const catResult = await db.collection("cats").insertMany(catData);
    console.log(
      `${catResult.insertedCount} contacts inserted with IDs:`,
      catResult.insertedIds
    );

    // CLEAR ALL PREVIOUS CAT BREED DATA
    await db.collection("catBreeds").deleteMany({});

    // INSERT NEW CAT BREED DATA
    const catBreedResult = await db
      .collection("catBreeds")
      .insertMany(catBreedData);
    console.log(
      `${catBreedResult.insertedCount} cat breeds inserted with IDs:`,
      catBreedResult.insertedIds
    );
  } catch (e) {
    console.error("Error inserting data:", e);
  } finally {
    await client.close();
  }
}

run();

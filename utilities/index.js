const { ObjectId } = require("mongodb");

const validateObjectId = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json("Must use a valid id to find a record.");
  }
  next();
};

// Validation function for cat data
const validateCat = (req, res, next) => {
  const body = req.body;
  
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Request body is missing or malformed' });
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
      return res.status(400).json({ error: `Missing required field: ${key}` });
    }
  }
  
  if (typeof body.name !== 'string' || !body.name.trim()) {
    return res.status(400).json({ error: 'Name must not be empty' });
  }
  if (typeof body.breed !== 'string' || !body.breed.trim()) {
    return res.status(400).json({ error: 'Breed must not be empty' });
  }
  if (typeof body.gender !== 'string' || !body.gender.trim()) {
    return res.status(400).json({ error: 'Gender must not be empty' });
  }
  if (typeof body.isVaccinated !== 'boolean') {
    return res.status(400).json({ error: 'isVaccinated must be a boolean' });
  }
  if (typeof body.weight !== 'string' && typeof body.weight !== 'number') {
    return res.status(400).json({ error: 'Weight must be a string or number' });
  }
  if (typeof body.birthday !== 'string' || !body.birthday.trim()) {
    return res.status(400).json({ error: 'Birthday must not be empty' });
  }
  if (typeof body.imageURL !== 'string' || !body.imageURL.trim()) {
    return res.status(400).json({ error: 'imageURL must not be empty' });
  }
  
  next();
};

// Validation function for cat breed data
const validateCatBreed = (req, res, next) => {
  const body = req.body;
  
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Request body is missing or malformed' });
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
      return res.status(400).json({ error: `Missing required field: ${key}` });
    }
  }
  
  if (typeof body.breed !== 'string' || !body.breed.trim()) {
    return res.status(400).json({ error: 'Breed must not be an empty string' });
  }
  if (typeof body.description !== 'string' || !body.description.trim()) {
    return res.status(400).json({ error: 'Description must not be an empty string' });
  }
  if (typeof body.avgLifespan !== 'string' && typeof body.avgLifespan !== 'number') {
    return res.status(400).json({ error: 'avgLifespan must be a string or number' });
  }
  if (typeof body.avgLength !== 'string' && typeof body.avgLength !== 'number') {
    return res.status(400).json({ error: 'avgLength must be a string or number' });
  }
  if (typeof body.avgWeightMale !== 'string' && typeof body.avgWeightMale !== 'number') {
    return res.status(400).json({ error: 'avgWeightMale must be a string or number' });
  }
  if (typeof body.avgWeightFemale !== 'string' && typeof body.avgWeightFemale !== 'number') {
    return res.status(400).json({ error: 'avgWeightFemale must be a string or number' });
  }
  if (typeof body.imageURL !== 'string' || !body.imageURL.trim()) {
    return res.status(400).json({ error: 'imageURL must not be an empty string' });
  }
  
  next();
};


module.exports = {
  validateObjectId,
  validateCat,
  validateCatBreed,
};
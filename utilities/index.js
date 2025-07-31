const { ObjectId } = require("mongodb");

const validateObjectId = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json("Must use a valid contact id to find a contact.");
  }
  next();
};

module.exports = {
  validateObjectId,
};

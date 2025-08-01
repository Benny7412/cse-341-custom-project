const getHome = (req, res) => {
  res.json({ message: "Welcome to the Cats API" });
  console.log("Entered Home.");
};

module.exports = getHome;

const isAuthenticated = (req, res, next) => {
  if (typeof req.isAuthenticated === "function" && req.isAuthenticated()) {
    return next();
  }
  if (req.user) {
    return next();
  }
  if (req.session && req.session.user) {
    return next();
  }
  return res.status(401).json({ error: "You do not have access." });
};

module.exports = {
  isAuthenticated,
};

const express = require("express");
const router = express.Router();
const getHome = require("../controllers/index");
const passport = require("passport");

router.get("/login", passport.authenticate("github"));
router.use("/cats", require("./cats"));
router.use("/catBreeds", require("./catBreeds"));

router.get("/login", (req, res, next) => {
  const dynamicCallback = `${req.protocol}://${req.get(
    "host"
  )}/github/callback`;
  passport.authenticate("github", { callbackURL: dynamicCallback })(
    req,
    res,
    next
  );
});

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;

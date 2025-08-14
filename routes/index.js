const express = require("express");
const router = express.Router();
const passport = require("passport");

router.use("/cats", require("./cats"));
router.use("/catBreeds", require("./catBreeds"));

router.get("/login", passport.authenticate("github"));

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    if (req.session) {
      return req.session.destroy(() => res.redirect("/"));
    }
    res.redirect("/");
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const getHome = require("../controllers/index");
const passport = require("passport");

router.get("/", getHome);
router.use("/cats", require("./cats"));
router.use("/catBreeds", require("./catBreeds"));

router.get('login', passport.authenticate('github', (req, res) => {}));
router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) {return next(err); }
        res.redirect('/');
    });
 });

module.exports = router;

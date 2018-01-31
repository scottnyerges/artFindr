var router = require("express").Router();

// This route renders the homepage
router.get("/", function(req, res) {
  res.render("home");
});

// This route renders the saved handledbars page
router.get("/saved", function(req, res) {
  res.render("saved");
});

module.exports = router;

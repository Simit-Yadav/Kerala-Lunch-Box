const express = require("express");
const router = express.Router();
const path = require("path");

// home route
router.get("/", (req, res) => {
  // rendering index page.
  res.render("general/index");
});

router.get("/mealPlans", (req, res) => {
  res.render("general/mealPlans");
});

router.get("/description", (req, res) => {
  res.render("general/description");
});

module.exports = router;

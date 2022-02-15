const express = require("express");
const {
  addSpot,
  getSpot,
  getSpotsAroundMe,
  testToken,
} = require("../controllers/addSpot.controller");

const router = express.Router();

router.post("/", addSpot);
router.get("/:id", getSpot);
router.get("/city/:city", getSpotsAroundMe);

module.exports = router;

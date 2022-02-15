const express = require("express");
const {
  addSpot,
  getSpot,
  getSpotsAroundMe,
  testToken,
  saveSpotImage,
} = require("../controllers/addSpot.controller");

const router = express.Router();

router.post("/", addSpot);
router.get("/:id", getSpot);
router.get("/city/:city", getSpotsAroundMe);
router.post("/photo", saveSpotImage);

module.exports = router;

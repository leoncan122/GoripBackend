const express = require("express");
const {
  addSpot,
  getSpot,
  getSpotsAroundMe,
  saveSpotImage,
} = require("../controllers/addSpot.controller");
const { uploadImageAws } = require("../middlewares/uploadImageAWS");

const router = express.Router();

router.post("/", uploadImageAws, addSpot);
router.get("/:id", getSpot);
router.get("/city/:city", getSpotsAroundMe);
router.post("/photo", saveSpotImage);

module.exports = router;

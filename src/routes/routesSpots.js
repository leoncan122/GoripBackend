const express = require("express");
const {
  addSpot,
  getSpot,
  getSpotsAroundMe,
  downloadSpotImage,
} = require("../controllers/addSpot.controller");
const { uploadImageAws } = require("../middlewares/s3Bucket");
const { saveSpotImage } = require("../controllers/addSpot.controller");
// const { uploadImageAws } = require("../middlewares/uploadImageAWS");

const router = express.Router();

router.post("/", addSpot);
router.get("/:id", getSpot);
router.get("/city/:city", getSpotsAroundMe);
router.get("/photo/:id", downloadSpotImage);

module.exports = router;

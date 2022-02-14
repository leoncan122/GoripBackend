const mongoose = require("mongoose");

const spotSchema = new mongoose.Schema({
  type: String,
  address: String,
  city: String,
  postal_code: String,
  description: String,
  lat: Number,
  long: Number,
});

const Spot = mongoose.model("Spot", spotSchema);

module.exports = Spot;

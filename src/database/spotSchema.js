const mongoose = require('mongoose');

const spotSchema = new mongoose.Schema({
    type: String,
    address: String,
    description: String
});

const Spot = mongoose.model('Spot', spotSchema);

module.exports = Spot;
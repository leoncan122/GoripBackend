const Spot = require("../database/spotSchema");

exports.addSpot = async (req, res) => {
  const spot = req.body;
  spot.photo = req.url;
  try {
    const existingSpot = await Spot.find({ address: spot.address });

    const data = new Spot(spot);
    if (existingSpot.length === 0) {
      await data.save();
      return res.status(201).send(spot);
    }
    res.status(422).send({ msg: "Spot already exists" });
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};

exports.getSpot = async (req, res) => {
  const id = req.params.id;
  try {
    const spot = await Spot.findById(id);
    res.status(200).send(spot);
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};

exports.getSpotsAroundMe = async (req, res) => {
  const city = req.params.city;

  try {
    const spots = await Spot.find({ city: city });
    res.status(200).send(spots);
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};
exports.testToken = async (req, res) => {
  const { id } = req;
  console.log(id);

  try {
    const spot = await Spot.findById(id);
    res.status(200).send(spot);
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};
exports.saveSpotImage = async (req, res) => {
  try {
    console.log(req.body);
    res.status(200).send("image received");
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};

const Spot = require("../database/spotSchema");
const { downloadImageAws } = require("../middlewares/s3Bucket");

exports.addSpot = async (req, res) => {
  const spot = req.body;
  spot.photo = req.url; //change photo propertie from base64 to s3 bucket url
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

    // const modifiedSpots = spots.map((spot) => ({
    //   ...spot,
    //   photo: downloadImageAws(spot.photo).then((data) => {
    //     const x = data.Body.toString("utf-8"); // Use the encoding necessary
    //     // console.log(spot);
    //     return x;
    //   }),
    // }));
    // console.log(modifiedSpots);

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
exports.downloadSpotImage = async (req, res) => {
  const { id } = req.params;
  try {
    downloadImageAws(id).then((data) => {
      const base64 = data.Body.toString("utf-8"); // Use the encoding necessary
      res.status(200).send({ photo: base64 });
    });
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};

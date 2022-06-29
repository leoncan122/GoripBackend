const Spot = require("../database/spotSchema");
const {
  downloadImageAws,
  uploadImageAwsTest,
} = require("../middlewares/s3Bucket");

exports.addSpot = async (req, res) => {
  const spot = req.body;
  try {
    const existingSpot = await Spot.find({ address: spot.address });
    //is not a promise because i want to save the spot even if the photo it not saved

    if (existingSpot.length === 0) {
      await uploadImageAwsTest(req.file).then(
        (result) => (spot.photo = result.Location)
      );
      console.log(spot);
      const data = new Spot(spot);

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
exports.downloadSpotImage = async (req, res) => {
  const { id } = req.params;
  try {
    downloadImageAws(id).then((data) => {
      const b64 = Buffer.from(data.Body).toString("base64");
      // IF THE ABOVE LINE DOES NOT WORK, TRY THIS:
      // const b64 = data.photo.Body.toString('base64');
      // CHANGE THIS IF THE IMAGE YOU ARE WORKING WITH IS .jpg OR WHATEVER
      res.status(200).send({ b64: b64 });
    });
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};

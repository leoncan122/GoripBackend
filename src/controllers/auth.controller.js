const User = require("../database/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.signUp = async (req, res) => {
  const body = req.body;
  const hashedPass = await bcrypt.hashSync(body.password, 10);
  body.password = hashedPass;
  try {
    const newUser = new User(body);
    await newUser.save();

    res.status(200).send({ status: "Signed up", authenticated: true });
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};

exports.login = async (req, res) => {
  const body = req.body;

  try {
    const checkUser = await User.find({ email: body.email });
    if (checkUser.length === 0) {
      return res
        .status(401)
        .send({ authenticated: false, status: "User not found" });
    }
    const payload = JSON.stringify(checkUser[0]._id);

    const token = jwt.sign({ userId: payload }, process.env.tokenSecret, {
      expiresIn: "1h",
    });
    const passIsValid = await bcrypt.compareSync(
      body.password,
      checkUser[0].password
    );
    if (!passIsValid) {
      return res
        .status(401)
        .send({ authenticated: false, status: "invalid password" });
    }

    res
      .status(200)
      .send({ authenticated: true, status: "loged", token: token });
  } catch (error) {
    return res
      .status(500)
      .send({ authenticated: false, status: "Unauthorized" });
  }
};

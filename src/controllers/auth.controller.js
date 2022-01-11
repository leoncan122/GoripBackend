const User = require("../database/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {
  const body = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(body.password, salt);

  body.password = hashedPass;
  try {
    const newUser = new User(body);
    await newUser.save();

    res.status(200).send({ msg: "Signed up", authorized: true });
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};

exports.login = async (req, res) => {
  const body = req.body;

  try {
    const checkUser = await User.find({ email: body.email });

    //const result = checkUser.some((user) => (user.email = body.email));
    if (checkUser.length < 1) {
      return res
        .status(401)
        .send({ authenticated: false, status: "User not found" });
    }
    const payload = JSON.stringify(checkUser[0]._id);
    const token = jwt.sign({ userId: payload }, "hola", {
      expiresIn: "1h",
    });
    const passIsValid = await bcrypt.compare(
      body.password,
      checkUser[0].password
    );

    if (!passIsValid) {
      return res
        .status(401)
        .send({ authenticated: false, status: "User not found" });
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

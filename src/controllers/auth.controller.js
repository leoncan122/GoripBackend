const User = require("../database/userSchema");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  const body = req.body;

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
    const checkUser = await User.find(body);
    const payload = JSON.stringify(checkUser[0]._id);
    const token = jwt.sign({ userId: payload }, "hola", {
      expiresIn: "1h",
    });

    const result = checkUser.some((user) => (user.email = body.email));
    if ((checkUser.length < 1) | (result === false)) {
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

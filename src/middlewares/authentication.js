const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyAuthToken = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(404).send({ message: "Token not found" });
  }
  try {
    const decoded = jwt.verify(token, process.env.tokenSecret);
    console.log(decoded);

    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(500).send(error);
  }
};

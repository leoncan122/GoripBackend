const express = require("express");
const router = express.Router();

const { login, signUp } = require("../controllers/auth.controller");
const { verifyAuthToken } = require("../middlewares/authentication");

router.post("/login", login);
router.post("/signup", signUp);
// router.get("/token", verifyAuthToken);

module.exports = router;

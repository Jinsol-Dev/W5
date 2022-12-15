const express = require("express");
const router = express.Router();

const SignController = require("../controllers/sign.controller");
const signController = new SignController();

router.post("/signup", signController.createUser);
router.post("/login", signController.login);

module.exports = router;

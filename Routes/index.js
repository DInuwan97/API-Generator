const express = require("express");
const router = express.Router();
const Controller = require("../Controller");

router.route("/").post(Controller.createObj);

module.exports = router;

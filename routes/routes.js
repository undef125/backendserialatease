const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
let parserMiddle = bodyParser.urlencoded({ extended: true });

const { getNames, getLink } = require("../controllers/names");

router.get("/getnames/:channelname",cors(), getNames);
router.post("/getvideolink", [cors(), parserMiddle, express.json()], getLink);

module.exports = router;

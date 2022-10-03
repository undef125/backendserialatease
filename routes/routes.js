const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
let parserMiddle = bodyParser.urlencoded({ extended: true });

const { getNames, getLink } = require("../controllers/names");

router.get("/getnames/:channelname", getNames);
router.post("/getvideolink", [ parserMiddle, express.json()], getLink);

module.exports = router;

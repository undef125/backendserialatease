const express = require('express');
const app = express();
const router = require("./routes/routes");
const cors = require('cors');
const bodyParser = require('body-parser');

//Middlewares
const corsOpts = {
    origin: 'https://serialatease.netlify.app/',
    methods: ['GET', 'POST'],
    origin: true,
    credentials: true,
}
app.use("/",cors(corsOpts),router);
app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(5000)
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

// route

module.exports = app;

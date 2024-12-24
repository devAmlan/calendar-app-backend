const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// route
app.use("/auth", require("./api/auth/auth.controller"));
app.use("/user", require("./api/user/user.controller"));
app.use("/shift", require("./api/shift/shift.controller"));
module.exports = app;

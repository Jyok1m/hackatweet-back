// Dotenv initialisation:
require("dotenv").config();

// Express boilerplate:
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// DB initialisation:
require("./models/connection");

// Router configs:
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var tweetsRouter = require("./routes/tweets");

// Express initialisation:
var app = express();

// CORS installation:
const cors = require("cors");
app.use(cors());

// Other Express boilerplate:
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Route extensions:
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/tweets", tweetsRouter);

module.exports = app;

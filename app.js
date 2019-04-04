const compression = require("compression");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const validator = require("express-validator");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 500 // limit each IP to 200 requests per windowMs
});

// API routes
var usersRouter = require("./src/v1/routes/users");

// Middleware
app.use(cors());
app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(validator());
app.use(compression());
app.use(limiter);

// Endpoints
app.use("/api/v1/users", usersRouter);

// Handle Errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});

module.exports = app;

var createError = require("http-errors");
var compression = require("compression");
var express = require("express");
var path = require("path");
var logger = require("morgan");
var cors = require("cors");
const validator = require("express-validator");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	max: 500 // limit each IP to 200 requests per windowMs
});

// api version: v1
var usersRouter = require("./src/v1/routes/users");

var app = express();

// view engine setup
// app.set("views", path.join(__dirname + "/src", "views"));
// app.set("view engine", "jade");

app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(validator());
app.use(compression());
app.use(limiter);

app.use("/api/v1/users", usersRouter);

app.get("*", function(req, res, next) {
	let err = new Error("Page Not Found");
	err.statusCode = 404;
	next(err);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "production" ? err : {};
	res.status(err.status || 500);
	res.status(err.statusCode).send(err.message);
});

module.exports = app;

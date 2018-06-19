var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var fs = require("fs");

console.log("environment : ", process.env.NODE_ENV);

//sawagger
var swaggerUi = require("swagger-ui-express");
var swaggerDocument = require("./api/swagger/swagger.json");

var app = express();

// const DBInit = require("./db-init");
// const dBInit = new DBInit();
// dBInit.init();


//swagger
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//winston logger
const winston = require("./config/winston.config");

// setup the logger
app.use(morgan('combined', { stream: winston.stream }))

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


//test api
app.use("/sayhello", (req, res, next) => {
  res.json({ msg: "hello world!" });
})


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
var errorMiddleware = require("./middleware/error.middleware");
app.use(errorMiddleware);

module.exports = app;

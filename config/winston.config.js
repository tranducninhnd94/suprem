const winston = require("winston");
const appRoot = require('app-root-path');
require('winston-daily-rotate-file');

const logDir = appRoot + '/logs';
const logLevel = process.env.LOG_LEVEL;

var options = {
  file: {
    level: logLevel || "info",
    // filename: `${appRoot}/logs/app.log`,
    // handleExceptions: true,
    // json: true,
    // maxsize: 5242880, // 5MB
    // maxFiles: 5,
    // formatter: customFileFormatter,
    // colorize: false
    timestamp: Date.now(),
    filename: `${logDir}/%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    prepend: true,
  },
  console: {
    level: logLevel || "debug",
    handleExceptions: true,
    json: false,
    colorize: true
  }
};

// instantiate a new Winston Logger with the settings defined above
var logger = new winston.Logger({
  transports: [
    new (winston.transports.DailyRotateFile)(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: true // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function (message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  }
};

module.exports = logger;

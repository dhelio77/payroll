const winston = require('winston')
require('winston-daily-rotate-file')
const env = process.env.APP_ENV || 'local'
const config = require('../config/config')

/**
 * handles successful logs and error logs
 */
let filelog = new winston.transports.DailyRotateFile({
    name: 'log-daily-rotate-file'
    , filename: `./logs/${config.files.loggerfile}`
    , datePattern: 'yyyy-MM-dd.'     // this option determines the rotation, if includes hh then it will rotate hourly
    , prepend: true
    , level: env === 'local' ? 'info' : 'info'
    , handleExceptions: true
    , json: true
    , colorize: false
    , maxsize: 15482880  //15MB
    , maxFiles: 5
    , tailable: true
    , zippedArchive: true
})
/**
 * handles error logs
 */
let errorlog = new winston.transports.File({
    name: 'log-error-file'
    , filename: `./logs/${config.files.errorfile}`
    , level: env === 'local' ? 'error' : 'error'
    , handleExceptions: true
    , json: true
    , colorize: false
    , maxsize: 15482880   //15MB
    , maxFiles: 5
    , tailable: true
    , zippedArchive: false
})
/**
 * handles console logs
 */
let consolelog = new winston.transports.Console({
    name: 'log-console'
    , level: env === 'local' ? 'info' : 'debug'
    , handleExceptions: true
    , json: true
    , colorize: false
})
/**
 * transport the logging config to logger
 */
let logger = (winston.createLogger)({
    transports: [
        filelog
        , consolelog
        , errorlog
    ],
    exceptionHandlers: [
        errorlog
    ],
    exitOnError: false
})

module.exports = logger
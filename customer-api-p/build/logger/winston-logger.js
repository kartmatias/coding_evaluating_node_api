"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston = __importStar(require("winston"));
const path = __importStar(require("path"));
const appRoot = __importStar(require("app-root-path"));
const logLevelRegex = /silly|debug|verbose|info|warn|error/;
const fillExcept = ["message", "level"];
// default config values
const options = {
    logLevelFile: "debug",
    logLevelConsole: "debug",
    logfileRootPath: "logs",
    logfileMaxsize: 10485760,
    maxNoLogfile: 2,
};
// override config values
const setLogConfig = (config, callback) => {
    try {
        if (config && Object.keys(config).length) {
            if (config.logLevelFile && logLevelRegex.test(config.logLevelFile))
                options.logLevelFile = config.logLevelFile;
            if (config.logLevelConsole && logLevelRegex.test(config.logLevelConsole))
                options.logLevelConsole = config.logLevelConsole;
            if (config.logfileRootPath)
                options.logfileRootPath = config.logfileRootPath;
            if (config.logfileMaxsize)
                options.logfileRootPath = config.logfileMaxsize;
            if (config.maxNoLogfile)
                options.logfileRootPath = config.maxNoLogfile;
        }
        // execute the callback if any
        if (typeof callback === "function")
            callback();
        return true;
    }
    catch (e) {
        console.log("Error in configuring the logger " + JSON.stringify(e.message));
        return false;
    }
};
const formatter = info => {
    const t = new Date();
    const time = t.toLocaleString() + "," + t.getMilliseconds();
    let out = `[${info.level.toUpperCase()}] - ${time} - ${info.message}`;
    if (info.metadata.error) {
        out = out + " " + info.metadata.error;
        if (info.metadata.error.stack) {
            out = out + " " + info.metadata.error.stack;
        }
    }
    return out;
};
// init the winston logger
const logger = function () {
    const winstonLogger = winston.createLogger({
        transports: [
            new winston.transports.File({
                level: options.logLevelFile,
                filename: path.join(`${appRoot}/${options.logfileRootPath}/server-${new Date().getTime()}.log`),
                handleExceptions: true,
                maxsize: options.logfileMaxsize,
                maxFiles: options.maxNoLogfile,
                format: winston.format.combine(winston.format.metadata({ fillExcept: fillExcept }), winston.format.printf(formatter)),
            }),
            new winston.transports.Console({
                level: options.logLevelConsole,
                handleExceptions: true,
                format: winston.format.combine(winston.format.metadata({ fillExcept: fillExcept }), winston.format.printf(formatter)),
            })
        ],
        exitOnError: false, // do not exit on handled exceptions
    });
    winston.stream({ start: -1 }).on("log", function (log) {
        console.log(log);
    });
    return winstonLogger;
};
exports.default = {
    logger: logger,
    setLogConfig: setLogConfig
};

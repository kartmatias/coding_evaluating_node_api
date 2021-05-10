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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const tyboost = require('tyboost');
const bodyParser = __importStar(require("body-parser"));
const cors = __importStar(require("cors"));
const listEndpoints = __importStar(require("express-list-endpoints"));
const Table = __importStar(require("cli-table"));
const routes_1 = __importDefault(require("../routes"));
const initializers_1 = __importDefault(require("./initializers"));
const utils_1 = require("../utils");
// initialise express app with tyboost - https://www.npmjs.com/package/tyboost
utils_1.logger.info(`BOOT :: App is starting with environment :: ${utils_1.constants.ENV}`);
utils_1.logger.info(`BOOT :: Initialising express app with tyboost`);
const app = tyboost(express());
// register application level middleware
const registerCoreMiddleware = function () {
    try {
        utils_1.logger.info(`BOOT :: Registering core middleware started`);
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        utils_1.logger.info(`BOOT :: Registered middleware : bodyParser`);
        app.use(cors());
        app.options("*", cors());
        utils_1.logger.info(`BOOT :: Registered middleware : cors(*)`);
        utils_1.logger.info(`BOOT :: Registering core middleware done`);
    }
    catch (err) {
        utils_1.logger.error(`BOOT :: Error while registering core middleware . Check core middleware : ${JSON.stringify(err.message)}`);
    }
};
// register all routes in routes/index
const registerRoutes = (routers) => {
    try {
        if (Object.keys(routers) && Object.keys(routers).length) {
            utils_1.logger.info(`BOOT :: Registering routes started`);
            Object.keys(routers).forEach(key => {
                app.use("/", routers[key]);
            });
            // print the routes in console
            utils_1.logger.info(`BOOT :: Registered following routes`);
            const table = new Table({ head: ["", "Path"] });
            listEndpoints(app).forEach(route => {
                if (route.path != "*") {
                    const row = {};
                    row[`${route.methods.join(", ")}`] = route.path;
                    table.push(row);
                }
            });
            utils_1.logger.info(`\n${table.toString()}`);
            utils_1.logger.info("BOOT :: Registering routes done");
        }
    }
    catch (err) {
        utils_1.logger.error(`BOOT :: Error while registering routes. Check routes : ${JSON.stringify(err.message)}`);
    }
};
// register all initializer in initializers/index
const registerInitializers = (initializers) => {
    try {
        utils_1.logger.info(`BOOT :: Registering initializer started`);
        Object.keys(initializers).forEach(key => {
            app.register(initializers_1.default[key]);
            utils_1.logger.info(`BOOT :: Registered initializer : ${key}`);
        });
        utils_1.logger.info(`BOOT :: Registering initializer done`);
    }
    catch (err) {
        utils_1.logger.error(`BOOT :: Error while registering initializer. Check initializer : ${JSON.stringify(err.message)}`);
    }
};
const handleError = () => {
    process.on("uncaughtException", function (err) {
        utils_1.logger.error(`UNCAUGHT_EXCEPTION OCCURRED : ${JSON.stringify(err.stack)}`);
        process.exit(1);
    });
};
// start application
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // register core application level middleware
        registerCoreMiddleware();
        // register routes
        registerRoutes(routes_1.default ? routes_1.default : {});
        // register all the initializer
        registerInitializers(initializers_1.default ? initializers_1.default : {});
        utils_1.logger.info(`BOOT :: Booting application started`);
        yield app.boot();
        utils_1.logger.info(`BOOT :: Booting application done`);
        app.listen(utils_1.constants.PORT, utils_1.constants.HOST).on("error", (error) => {
            if (error.syscall !== "listen") {
                throw error;
            }
            // handle specific listen errors with friendly messages
            switch (error.code) {
                case "EACCES":
                    utils_1.logger.error(`BOOT :: ${utils_1.constants.HOST}:${utils_1.constants.PORT} requires elevated privileges`);
                    process.exit(1);
                    break;
                case "EADDRINUSE":
                    utils_1.logger.error(`BOOT :: ${utils_1.constants.HOST}:${utils_1.constants.PORT} is already in use`);
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        })
            .on("listening", () => {
            utils_1.logger.info(`BOOT :: <> <> <> <> <> <> <> <> <> <> Listening on ${utils_1.constants.HOST}:${utils_1.constants.PORT} <> <> <> <> <> <> <> <> <> <>`);
        });
        // exit on uncaught exception
        handleError();
    }
    catch (err) {
        utils_1.logger.error(`BOOT :: Error while booting application from boot script : ${JSON.stringify(err)}`);
        throw err;
    }
});
exports.default = startApp;

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const events_1 = require("events");
const util = __importStar(require("util"));
const constants_1 = __importDefault(require("./utils/constants"));
const utils_1 = require("../../src/utils");
class Mongo extends events_1.EventEmitter {
    constructor(config) {
        super();
        this.URI = util.format("mongodb://%s/%s", config.hosts, config.database);
        utils_1.logger.info(`MONGO_CONNECTOR :: Connecting to MongoDB database ${this.URI}`);
        const connectionConfig = {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            poolSize: config.connectionLimit ? config.connectionLimit : 5,
            reconnectTries: Number.MAX_VALUE,
            auto_reconnect: true,
            noDelay: true,
            keepAlive: true,
            connectTimeoutMS: 300000,
            socketTimeoutMS: 300000
        };
        // replica set setting
        if (config.rsName) {
            connectionConfig["replicaSet"] = config.rsName;
        }
        // username and password setting
        if (config.user && config.password) {
            connectionConfig["auth"] = {
                user: config.user,
                pass: config.password,
            };
        }
        this.connection = mongoose.createConnection(this.URI, connectionConfig, (err) => {
            if (err) {
                utils_1.logger.error(`MONGO_CONNECTOR :: Could not connect to MongoDB database ${this.URI} - ${err.stack}`);
                this.emit(constants_1.default.EventEnums.CONNECTION_ERROR.toString());
            }
            else {
                utils_1.logger.info(`MONGO_CONNECTOR :: Successfully connected to MongoDB database ${this.URI}`);
                this.emit(constants_1.default.EventEnums.CONNECTION_SUCCESS.toString(), this.connection);
            }
        });
    }
    initializeDriver() {
        const _this = this;
        return new Promise((resolve, reject) => {
            this.connection.on("open", function () {
                utils_1.logger.info(`MONGO_CONNECTOR :: Successfully connected to MongoDB database ${_this.URI}`);
                _this.emit(constants_1.default.EventEnums.CONNECTION_SUCCESS.toString(), _this.connection);
                resolve();
            });
            this.connection.on("error", function (error) {
                utils_1.logger.error(`MONGO_CONNECTOR :: There was an error in mongodb ${error}`);
                _this.emit(constants_1.default.EventEnums.CONNECTION_ERROR.toString(), error);
            });
            _this.connection.on("disconnected", function (error) {
                utils_1.logger.error(`MONGO_CONNECTOR :: There was an disconnected in mongodb ${error}`);
                _this.emit(constants_1.default.EventEnums.CONNECTION_END.toString(), error);
            });
        });
    }
    getMongoInstance() {
        return this.connection;
    }
}
exports.default = Mongo;

"use strict";
/*
* On successful initialization invoke resolve
* Resolve will trigger next initializer
*
* On fail initialization you can invoke reject
* Reject will stop the booting up of express app. In case you don't want to stop booting process if initialization fails invoke resolve
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const init = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (utils_1.config.databases.mongo.enable) {
                utils_1.logger.info(`BOOT :: Connecting Mongo at : ${JSON.stringify(utils_1.config.databases.mongo.host)}`);
                const mongoClient = yield utils_1.mongo.initialize({
                    "hosts": utils_1.config.databases.mongo.host,
                    "database": utils_1.config.databases.mongo.user_database,
                    "connectionLimit": 5
                });
                utils_1.Connections.set(utils_1.constants.CONNECTIONS.MONGO, mongoClient);
                utils_1.logger.info(`BOOT :: Connected Mongo at : ${JSON.stringify(utils_1.config.databases.mongo.host)}, DB: ${utils_1.config.databases.mongo.user_database}`);
            }
        }
        catch (err) {
            utils_1.logger.error(`BOOT :: Error connecting to Mongo server at ${utils_1.config.databases.mongo.host} :: message: ${err.message} :: stack : ${err.stack}`);
            throw new Error(err.message);
        }
    });
};
exports.default = init;

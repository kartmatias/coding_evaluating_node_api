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
            if (utils_1.config.databases.redis.enable) {
                utils_1.logger.info(`BOOT :: Connecting redis at : ${JSON.stringify(utils_1.config.databases.redis.host)}`);
                const redisClient = yield utils_1.redis.initialize(utils_1.constants.REDIS_SERVER_TYPE.REDIS, {
                    host: utils_1.config.databases.redis.host
                });
                utils_1.Connections.set(utils_1.constants.CONNECTIONS.REDIS, redisClient);
                utils_1.logger.info(`BOOT :: Connected redis at : ${JSON.stringify(utils_1.config.databases.redis.host)}`);
            }
        }
        catch (err) {
            utils_1.logger.error(`BOOT :: Error connecting to redis server at ${utils_1.config.databases.redis.host} :: message: ${err.message} :: stack : ${err.stack}`);
        }
    });
};
exports.default = init;

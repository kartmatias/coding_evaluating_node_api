"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
class Redis {
    constructor() {
        this.redis = utils_1.Connections.get(utils_1.constants.CONNECTIONS.REDIS);
    }
    set(key, value) {
        this.redis.set(key, value);
    }
    get(key) {
        return this.redis.get(key);
    }
}
exports.default = Redis;

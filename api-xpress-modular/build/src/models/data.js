"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
class Data {
    constructor() {
        this.connection = utils_1.Connections.get(utils_1.constants.CONNECTIONS.DATA);
    }
    doSomething() {
        // do something with this.connection
        this.connection.something(); // this is just an example
    }
}
exports.default = Data;

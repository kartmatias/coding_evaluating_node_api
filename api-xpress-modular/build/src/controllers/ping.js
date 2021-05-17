"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const pingController = (req, res) => {
    // check you service health check here
    utils_1.logger.info(`Health check successful`);
    res.status(utils_1.statusCode.OK_200).send({
        "ping": "pong"
    });
};
exports.default = pingController;

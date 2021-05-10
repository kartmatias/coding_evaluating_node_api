"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_logger_1 = __importDefault(require("./winston-logger"));
const logger = function (config = {}, callback) {
    winston_logger_1.default.setLogConfig(config, callback);
    return winston_logger_1.default.logger();
};
exports.default = logger;

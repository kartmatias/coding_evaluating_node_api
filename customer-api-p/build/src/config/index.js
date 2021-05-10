"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./dev/index"));
const index_2 = __importDefault(require("./test/index"));
const index_3 = __importDefault(require("./stage/index"));
const index_4 = __importDefault(require("./production/index"));
const utils_1 = require("../utils");
const getConfigFiles = (environment) => {
    const env = environment && (typeof environment === "string") ? environment.toLocaleLowerCase() : undefined;
    switch (env) {
        case "dev":
            return index_1.default;
        case "test":
            return index_2.default;
        case "stage":
            return index_3.default;
        case "production":
            return index_4.default;
        default:
            utils_1.logger.error("Invalid type argument provided for config. Currently supported config type are dev, test, stage, production");
            return index_1.default;
    }
};
exports.default = {
    getConfigFiles
};

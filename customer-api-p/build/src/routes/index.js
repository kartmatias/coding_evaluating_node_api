"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const default_1 = __importDefault(require("./default"));
const ping_1 = __importDefault(require("./ping"));
const mongo_1 = __importDefault(require("./mongo"));
exports.default = {
    defaultRouter: default_1.default,
    pingRouter: ping_1.default,
    mongoRouter: mongo_1.default,
};

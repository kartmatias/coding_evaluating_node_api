"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const constants_1 = __importDefault(require("./constants"));
const config = config_1.default.getConfigFiles(constants_1.default.ENV);
exports.default = config;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const default_1 = __importDefault(require("./default"));
const express_winston_1 = __importDefault(require("./express-winston"));
exports.default = {
    defaultMiddleware: default_1.default,
    expressWinston: express_winston_1.default,
};

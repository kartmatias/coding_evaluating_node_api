"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = __importDefault(require("./data"));
const mongo_1 = __importDefault(require("./mongo"));
exports.default = {
    data: data_1.default,
    mongo: mongo_1.default,
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const en_us_1 = __importDefault(require("../../locales/en-us"));
const index_1 = require("./index");
let locale = {};
const setLocale = function (lan) {
    try {
        switch (lan) {
            case "en-us":
                locale = en_us_1.default;
                break;
            default:
                locale = en_us_1.default;
                break;
        }
        return true;
    }
    catch (err) {
        index_1.logger.error(`Error in setting up locales : ${JSON.stringify(err.message)}`);
        return false;
    }
};
function localization(key) {
    return locale[key] ? locale[key] : "";
}
// set up lang manually
setLocale("en-us");
exports.default = localization;

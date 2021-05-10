"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boot_1 = __importDefault(require("./boot"));
const utils_1 = require("./utils");
// Enable newrelic if switch is on
if (utils_1.config.switches.new_relic && utils_1.constants.ENV === utils_1.constants.ENVIRONMENTS.prod) {
    require("newrelic");
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield boot_1.default();
        utils_1.logger.info(`BOOT :: Application booted successfully!!`);
    }
    catch (err) {
        utils_1.logger.error(`BOOT :: Error while booting application from sever.js : ${JSON.stringify(err.message)}`);
    }
}))();

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
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
/*
* On successful initialization invoke resolve
* Resolve will trigger next initializer
*
* On fail initialization you can invoke reject
* Reject will stop the booting up of express app. In case you don't want to stop booting process if initialization fails invoke resolve
 */
const init = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // do your initialization here
            utils_1.Connections.set(utils_1.constants.CONNECTIONS.DATA, () => { });
        }
        catch (err) {
            utils_1.logger.error(`BOOT :: Error connecting to {data} : ${JSON.stringify(err.message)}`);
            throw new Error(err.message);
        }
    });
};
exports.default = init;

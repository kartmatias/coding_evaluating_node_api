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
const utils_1 = require("../utils");
const models_1 = __importDefault(require("../models"));
const mongoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield models_1.default.Users.getInstance().getAllUsers();
    res.status(utils_1.statusCode.OK_200).send(utils_1.Response.success(allUsers, {
        "link": "http://localhost:8080/v1/mongo_demo"
    }));
});
exports.default = mongoController;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultMiddleware = (req, res, next) => {
    next();
};
exports.default = defaultMiddleware;

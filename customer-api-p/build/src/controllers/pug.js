"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pugController = (req, res) => {
    res.render("index", {
        title: "Pug Demo",
        message: "Hello there!"
    });
};
exports.default = pugController;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RoutesConfig {
    constructor(app, name) {
        this.app = app;
        this.name = name;
        this.configureRoutes();
    }
    getName() {
        return this.name;
    }
}
exports.default = RoutesConfig;

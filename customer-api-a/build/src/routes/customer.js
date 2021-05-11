"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = __importDefault(require("./routes"));
class CustomerRoutes extends routes_1.default {
    constructor(app) {
        super(app, 'CustomersRoutes');
    }
    configureRoutes() {
        this.app.route('/customers')
            .get((req, res) => {
            res.status(200).send('List of customers');
        });
        return this.app;
    }
}
exports.default = CustomerRoutes;

import RoutesConfig from './routes';
import express from 'express';

export default class CustomerRoutes extends RoutesConfig {
    constructor(app: express.Application) {
        super(app, 'CustomersRoutes');
    }

    configureRoutes() {
        this.app.route('/customers')
        .get(
            (req: express.Request, res: express.Response) => {
                res.status(200).send('List of customers');
            }
        )
        return this.app;
    }
}
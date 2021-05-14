import {RoutesConfig} from './routes.config';
import express from 'express';

export class CustomersRoutes extends RoutesConfig {
    constructor(app: express.Application) {
        super(app, 'CustomersRoutes');
    }
    configure(): express.Application {
        this.app.route('/customers')
        .get((req: express.Request, res: express.Response) => {
            res.status(200).send('Lista de usuários');
        })
        .post((req: express.Request, res: express.Response) => {
            res.status(200).send('Post to users');
        });

        this.app.route('/customers/:customerId')
        .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
            next();  
        })
        .get((req: express.Request, res: express.Response) => {
            res.status(200).send(`Get for ${req.params.customerId}`)
        })
        .put((req: express.Request, res: express.Response) => {
            res.status(200).send(`PUT requested for id ${req.params.customerId}`);
        })
        .patch((req: express.Request, res: express.Response) => {
            res.status(200).send(`PATCH requested for id ${req.params.customerId}`);
        })
        .delete((req: express.Request, res: express.Response) => {
            res.status(200).send(`DELETE requested for id ${req.params.customerId}`);
        });
        return this.app;
    }
}


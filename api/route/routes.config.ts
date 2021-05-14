import express from 'express';

export abstract class RoutesConfig {
    app: express.Application;
    name: string;
    
    
    constructor(app: express.Application, name: string) {
        this.app = app;
        this.name = name;
    }

    getName() {
        return this.name;
    }

    abstract configure():express.Application;

}
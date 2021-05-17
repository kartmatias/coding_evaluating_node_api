import { Request, Response } from "express"

const mongoClient = require('mongodb');
const assert = require('assert');

export function initialize() {
    const uri = 'mongodb://mongo:27017';
    const client = new mongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
    client.connect(function(err: any) {
        assert.equal(null, err);
        console.log('Connected successfully to server');
    })
}

export let allCustomers = (req:Request, res: Response) => {
    res.send("Listando todos clientes");
}

export let getCustomer = (req: Request, res: Response) => {
    res.send("Returns one Customer");
  };
  
  export let deleteCustomer = (req: Request, res: Response) => {
    res.send("Returns one Customer");
  };
  
  export let updateCustomer = (req: Request, res: Response) => {
    res.send("Returns one Customer");
  };
  
  export let addCustomer = (req: Request, res: Response) => {
    res.send("Returns one Customer");
  };
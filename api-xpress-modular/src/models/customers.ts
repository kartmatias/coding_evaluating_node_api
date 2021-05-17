import { Connections, constants, config } from "../utils";
import * as mongoose from "mongoose";

export default class Customers {

    public static Customers;
    private customersModel;
    readonly collectionName;

    constructor() {
        this.collectionName = config.databases.mongo.user_collection;
        this.setDbModel();
    }

    public static getInstance(): Customers {
        if (!this.Customers) {
            this.Customers = new Customers();
            return this.Customers;
        }
        return this.Customers;
    }

    private setDbModel() {
        const mongoConnection = Connections.get(constants.CONNECTIONS.MONGO);
        const Schema = mongoose.Schema;
        const bodDetailsSchema = new Schema({
            name: { type: String, required: true },
            email: { type: String, required: true  },
            phone: { type: Number, required: false  }
        },
        {
            collection:  this.collectionName
        });
        this.customersModel = mongoConnection.model(
            this.collectionName,
            bodDetailsSchema
        );
    }

    public async getAllUsers() {
        const queryFilter = {
        };
        return  await this.customersModel.find(queryFilter, {}, {lean: true});
    }

}

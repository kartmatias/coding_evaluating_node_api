"use strict";

const DbMixin = require("../mixins/db.mixin");


module.exports = {
    name: "customers",
    mixins: [DbMixin("customers")],
    settings: {
        fields: [
            "_id",
            "name",
            "address",
            "email",
            "phone",
            "balance",
			"created_at",
			"updated_at"
        ],
        entityValidator: {
            name: "string|min:5",
            balance: "number",
			created_at: "date",
			updated_at: "date"
        }
    },
    hooks: {
        before: {
			"*": function(ctx) {
				ctx.params.updated_at = new Date();
			},
            create(ctx) {
				ctx.params.created_at = new Date();
            }
        }
    },
    actions: {
		deposit: {
			rest: "PUT /:id/balance/deposit",
			params: {
				id: "string",
				value: "number|integer|positive"
			},
			async handler(ctx) {
				const doc = await this.adapter.updateById(ctx.params.id, { $inc: { balance: ctx.params.value } });
				const json = await this.transformDocuments(ctx, ctx.params, doc);
				await this.entityChanged("updated", json, ctx);

				return json;
			}
		},

		withdraw: {
			rest: "PUT /:id/balance/withdraw",
			params: {
				id: "string",
				value: "number|integer|positive"
			},
			async handler(ctx) {
				const doc = await this.adapter.updateById(ctx.params.id, { $inc: { balance: -ctx.params.value } });
				const json = await this.transformDocuments(ctx, ctx.params, doc);
				await this.entityChanged("updated", json, ctx);

				return json;
			}
		}

    },
    methods: {
		async seedDB() {
			await this.adapter.insertMany([
				{ name: "Carlos Matias", address: "Rua 41", email: "kartmatias@gmail.com", phone: "85996766627",balance: 10000, },
				{ name: "Jose Carlos", address: "Rua 43", email: "jose@gmail.com", phone: "85996565588",balance: 23000, },
				{ name: "Luiz Carlos", address: "Rua 42", email: "luiz@gmail.com", phone: "85988887575",balance: 15500, },
			]);
		}
	},
}

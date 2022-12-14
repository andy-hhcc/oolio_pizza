import { IBaseSchema } from '../../../shared/aws/dynamodb/index'
import { baseModel } from "../../../shared/aws/dynamodb/index";
import { DB } from "../../../shared/utils/constant";

export const OrdersSchema: IBaseSchema = {
    properties: {
        customerName: {
            type: String,
        },
        products: {
            type: Array,
            schema: [{
                type: Object,
                schema: {
                    productName: {
                        type: String,
                        required: true
                    },
                    price: {
                        type: Number,
                        required: true
                    },
                    number: {
                        type: Number,
                        required: true
                    }
                }
            }]
        },
        total: {
            type: Number,
            required: true
        }
    }
}

export const OrdersModel = baseModel({
    name: DB.ORDERS,
    schemas: [ OrdersSchema ],
})

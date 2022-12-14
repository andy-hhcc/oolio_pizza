import { IBaseSchema } from '../../../shared/aws/dynamodb'
import { baseModel } from '../../../shared/aws/dynamodb';
import { DB } from "../../../shared/utils/constant";

export const PricingRulesSchema: IBaseSchema = {
    properties: {
        customerName: {
            type: String,
            required: true
        },
        productName: {
            type: String,
            required: true
        },
        discountType: {
            type: String,
            enum: ["DiscountOnPrice", "Deal"],
            required: true
        },
        discountPrice: {
            type: Number
        },
        dealNeeded: {
            type: Number
        },
        dealFor: {
            type: Number
        }
    }
}

export const PricingRulesModel = baseModel({
    name: DB.PRICING_RULES,
    schemas: [ PricingRulesSchema ],
})

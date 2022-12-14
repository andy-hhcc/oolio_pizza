import { DB } from "../../../shared/utils/constant"
import { PricingRulesModel } from "../model/pricing_rules.model"

export const PricingRulesDAL = {
    getByCustomer: async(customerName: string) => {
        return await PricingRulesModel.query({
            PK: customerName,
            SK: {beginsWith: customerName}
        }).exec()
    }
}
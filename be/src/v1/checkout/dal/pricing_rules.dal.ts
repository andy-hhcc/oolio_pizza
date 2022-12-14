import { DB } from "../../../shared/utils/constant"
import { PricingRulesModel } from "../model/pricing_rules.model"

export const PricingRulesDAL = {
    getByUser: async(user: string) => {
        return await PricingRulesModel.query({
            PK: user,
            SK: {beginsWith: user}
        }).exec()
    }
}
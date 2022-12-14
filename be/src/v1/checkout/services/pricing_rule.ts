import { PricingRulesDAL } from '../dal/pricing_rules.dal'
import { ICartItem, DiscountType, IPricingRequest } from '../types'

export const calculatePricing = async (pricingRequest: IPricingRequest) => {
    const { user, products } = pricingRequest
    const rules = await PricingRulesDAL.getByUser(user)
    const total = products.reduce((_prevTotal: number, e: ICartItem) => {
        let _subTotal = 0
        if (rules.count > 0) {
            if (e.name === rules[0].productName) {
                if (rules[0].discountType === DiscountType.DISCOUNT_ON_PRICE) {
                    _subTotal = rules[0].discountPrice * e.quantity
                } else if (rules[0].discountType === DiscountType.DEAL) {
                    _subTotal = (Math.floor(e.quantity / rules[0].dealNeeded) * rules[0].dealFor + (e.quantity % rules[0].dealNeeded)) * e.price
                }
            } else {
                _subTotal = e.quantity * e.price
            }
        } else {
            _subTotal = e.quantity * e.price
        }

        return _subTotal + _prevTotal
    }, 0)

    return total
}

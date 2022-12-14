import { PricingRulesDAL } from '../dal/pricing_rules.dal'

export const calculatePricing = async (customer: string, products: any) => {
    const rules = await PricingRulesDAL.getByCustomer(customer)
    let total = 0
    products.forEach((e: any) => {
        if (rules.count > 0) {
            if (e.productName === rules[0].productName) {
                if (rules[0].discountType === 'DiscountOnPrice') {
                    e.total = rules[0].discountPrice * e.number
                } else if (rules[0].discountType === 'Deal') {
                    e.total = (Math.floor(e.number / rules[0].dealNeeded) * rules[0].dealFor + (e.number % rules[0].dealNeeded)) * e.price
                }
            } else {
                e.total = e.number * e.price
            }
        } else {
            e.total = e.number * e.price
        }

        total += e.total
        return e
    })

    return {
        total,
    }
}
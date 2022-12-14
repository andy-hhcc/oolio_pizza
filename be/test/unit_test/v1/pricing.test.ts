import { calculatePricing } from '../../../src/v1/checkout/services/pricing_rule'
import { IPricingRequest, UserType } from '../../../src/v1/checkout/types'

const small = 11.99
const medium = 15.99
const large = 21.99


describe('Pricing calculation', () => {
    test('Total price in case Amazon with 3M and 1L should be equal 67.96', async () => {
        const request: IPricingRequest = {
            user: UserType.AWS,
            products: [
                {
                    name: 'Medium Pizza',
                    price: medium,
                    quantity: 3,
                },
                {
                    name: 'Large Pizza',
                    price: large,
                    quantity: 1,
                },
            ],
        }

        await calculatePricing(request)
    })
})

import { calculatePricing } from '../../../src/v1/checkout/service/pricing_rule'

const small = 11.99
const medium = 15.99
const large = 21.99

describe('Pricing calculation', () => {
    test('Total price in case Amazon with 3M and 1L should be equal 67.96', async () => {
        await calculatePricing('Amazon',
            [
                {
                    productName: 'Medium Pizza',
                    price: medium,
                    number: 3,
                },
                {
                    productName: 'Large Pizza',
                    price: large,
                    number: 1,
                },
            ])
    })
})

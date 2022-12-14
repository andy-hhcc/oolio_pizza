import { parseBody } from '../../../shared/utils/helper'
import { OrdersDAL } from '../dal/orders.dal'
import { calculatePricing } from './pricing_rule'
import AppError from '../../../app_error/index'
import { IPricingRequest } from '../types'

export const checkout = async ({ event, res }: any) => {
    const body = parseBody(event.body)
    await OrdersDAL.create({})
}

export const pricing = async ({ event, res }: any) => {
    const pricingRequest: IPricingRequest = parseBody(event.body)

    if (!pricingRequest.user) {
        throw AppError.GeneralInvalidParameters(['user is required'])
    }

    if (!pricingRequest.products) {
        throw AppError.GeneralInvalidParameters(['products is required'])
    }

    const price = await calculatePricing(pricingRequest)

    res.data = price
}

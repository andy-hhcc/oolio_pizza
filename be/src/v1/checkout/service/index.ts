import { parseBody } from '../../../shared/utils/helper'
import { OrdersDAL } from '../dal/orders.dal'
import { calculatePricing } from './pricing_rule'
import AppError from '../../../app_error/index'

export const checkout = async ({ event, res }: any) => {
    const body = parseBody(event.body)
    const data = await calculatePricing(body.customerName, body.products)

    await OrdersDAL.create(data)
}

export const pricing = async ({ event, res }: any) => {
    const body = parseBody(event.body)

    if (!body.customerName) {
        throw AppError.GeneralInvalidParameters(['customerName is required'])
    }

    if (!body.products) {
        throw AppError.GeneralInvalidParameters(['products is required'])
    }

    const data = await calculatePricing(body.customerName, body.products)

    res.data = {
        total: data.total,
    }
}

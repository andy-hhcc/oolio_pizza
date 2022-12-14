import app_wrapper from '../../app_wrapper/index'
import { checkout, pricing } from './services'

export const checkoutFn = app_wrapper({
    fn: checkout
})

export const pricingFn = app_wrapper({
    fn: pricing
})

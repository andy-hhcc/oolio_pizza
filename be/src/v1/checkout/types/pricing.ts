import { UserType } from './user'
import { ICartItem } from './cart'

export interface IPricingRequest {
    user: UserType,
    products: Array<ICartItem>
}

export enum DiscountType {
    DISCOUNT_ON_PRICE = 'DiscountOnPrice',
    DEAL = 'Deal'
}

export interface IPricingRule {

}
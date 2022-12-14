import { UserType } from './user'
import { CartItem } from './cart'

export interface IPricingRule {

}

export interface IPricingRequest {
  customerName: UserType
  products: CartItem[]
}

export interface IPricingResponse {
  total: number
}
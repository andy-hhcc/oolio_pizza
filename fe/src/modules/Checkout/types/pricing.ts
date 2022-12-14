import { UserType } from './user'
import { CartItem } from './cart'

export interface IPricingRule {

}

export interface IPricingRequest {
  user: UserType
  products: CartItem[]
}

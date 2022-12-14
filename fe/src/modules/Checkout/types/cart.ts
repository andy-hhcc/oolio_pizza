import { IProduct } from './product'

export class CartItem {
  constructor(product: IProduct) {
    this.id = product.id
    this.name = product.name
    this.price = product.price
    this.quantity = 1
  }
  readonly id: string = ''
  readonly name: string = ''
  readonly price: number = 0.0
  readonly quantity: number = 1
}

export interface ICheckOutRequest {

}

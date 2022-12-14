import { IProduct } from './types'

export const apiEndPoint = 'https://445fs6njwl.execute-api.ap-southeast-1.amazonaws.com/dev/'

export const SMALL_PIZZA: IProduct = {
  id: 'product_1',
  name: 'Small Pizza',
  description: '10\'\' pizza for one person',
  price: 11.99,
}

export const MEDIUM_PIZZA: IProduct = {
  id: 'product_2',
  name: 'Medium Pizza',
  description: '12\'\' Pizza for two persons',
  price: 15.99,
}

export const LARGE_PIZZA: IProduct = {
  id: 'product_3',
  name: 'Large Pizza',
  description: '15\'\' Pizza for four persons',
  price: 21.99,
}

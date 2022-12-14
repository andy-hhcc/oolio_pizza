import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { cartState} from '../store'
import { replaceItemAtIndex } from '../utils'
import { CartItem, IProduct, UserType } from '../types'
import { apiPricing } from '../apis'

const useCheckOut = (): ICheckOutHook => {
  const [cart, setCart] = useRecoilState(cartState)
  const [total, setTotal] = useState<number>(0)

  const add = (product: IProduct) => {
    const _index = cart.findIndex(_product => _product.id === product.id)
    if (_index >= 0) {
      const newList = replaceItemAtIndex(cart, _index, {
        ...product,
        quantity: cart[_index].quantity + 1,
      })
      setCart(newList)
    } else {
      const newItem = new CartItem(product)
      setCart([...cart, newItem])
    }
  }

  const sum = (user: UserType, products: CartItem[]) => {
    apiPricing({
      user,
      products: products,
    }).then(({ data }) => {
      setTotal(data.data)
    })
      .catch()
      .finally()
  }

  const confirm = () => {

  }

  return {
    cart,
    total,
    add,
    sum,
    confirm,
  }
}

export default useCheckOut

interface ICheckOutHook {
  cart: CartItem[]
  total: number
  add: (item: IProduct) => void
  sum: (user: UserType, products: CartItem[]) => void
  confirm: () => void
}


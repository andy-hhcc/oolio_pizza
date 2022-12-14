import useCheckout from '../hooks/useCheckout'
import { CartItem, UserType } from '../types'
import { useRecoilState } from 'recoil'
import { currentUserState } from '../store'

const Cart = () => {
  const { cart, total, sum } = useCheckout()
  const [currentUser] = useRecoilState(currentUserState)

  const renderCartItem = (items: CartItem[]) => {
    return items.map((item, index) => {
      return (
        <tr key={`cart_${item.id}`}>
          <td>{index + 1}</td>
          <td>{item.name}</td>
          <td>{item.number}</td>
        </tr>
      )
    })
  }

  const renderTotal = (total: number) => {
    return (
      <tr>
        <td colSpan={2}>Total</td>
        <td>$ {total}</td>
      </tr>
    )
  }

  const handleTotal = (user: UserType, products: CartItem[]) => () => sum(user, products)

  return (
    <div className='cart'>
      <table>
        <tbody>
        {renderCartItem(cart)}
        {renderTotal(total)}
        </tbody>
      </table>
      <div className='button_group'>
        <button onClick={handleTotal(currentUser, cart)}>Total</button>
        <button onClick={handleTotal(currentUser, cart)}>Checkout</button>
      </div>
    </div>
  )
}

export default Cart

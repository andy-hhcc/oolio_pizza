import Login from './Login'
import Cart from './Cart'
import ProductSelection from './ProductSelection'
import './style.css'

const Checkout = () => {
  return (
    <div className='app'>
      <Login />
      <div className='checkout'>
        <ProductSelection />
        <Cart />
      </div>
    </div>
  )
}

export default Checkout

import useCheckOut from '../hooks/useCheckout'
import { LARGE_PIZZA, MEDIUM_PIZZA, SMALL_PIZZA } from '../const'
import { IProduct } from '../types'

const ProductSelection = () => {
  const { add } = useCheckOut()

  const handleAdd = (product: IProduct) => () => add(product)

  return (
    <div className='product_list'>
      <table border={1}>
        <thead>
        <tr>
          <td className='col_name'>Name</td>
          <td className='col_description'>Description</td>
          <td className='col_price'>Price</td>
          <td className='col_action'>
          </td>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td className='col_name'>{SMALL_PIZZA.name}</td>
          <td className='col_description'>{SMALL_PIZZA.description}</td>
          <td className='col_price'>$ {SMALL_PIZZA.price}</td>
          <td className='col_action'>
            <button onClick={handleAdd(SMALL_PIZZA)}>
              Add
            </button>
          </td>
        </tr>
        <tr>
          <td className='col_name'>{MEDIUM_PIZZA.name}</td>
          <td className='col_description'>{MEDIUM_PIZZA.description}</td>
          <td className='col_price'>$ {MEDIUM_PIZZA.price}</td>
          <td className='col_action'>
            <button onClick={handleAdd(MEDIUM_PIZZA)}>
              Add
            </button>
          </td>
        </tr>
        <tr>
          <td className='col_name'>{LARGE_PIZZA.name}</td>
          <td className='col_description'>{LARGE_PIZZA.description}</td>
          <td className='col_price'>$ {LARGE_PIZZA.price}</td>
          <td className='col_action'>
            <button onClick={handleAdd(LARGE_PIZZA)}>
              Add
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ProductSelection

import {AiFillCloseCircle} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value
      const {cartItemDetails} = props
      const {dishId, dishImage, dishName, dishPrice, quantity} = cartItemDetails
      const onRemoveCartItem = () => {
        removeCartItem(dishId)
      }

      const onIncrementCartItemQuantity = () => {
        incrementCartItemQuantity(dishId)
      }

      const onDecrementCartItemQuantity = () => {
        decrementCartItemQuantity(dishId)
      }

      return (
        <li className="cart-item">
          <img className="cart-product-image" src={dishImage} alt={dishName} />
          <div className="cart-item-details-container">
            <p className="cart-product-title">{dishName}</p>
            <div className="cart-quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onDecrementCartItemQuantity}
              >
                -
              </button>
              <p className="cart-quantity">{quantity}</p>
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onIncrementCartItemQuantity}
              >
                +
              </button>
            </div>
            <div className="total-price-remove-container">
              <p className="cart-total-price">Rs {dishPrice * quantity}/-</p>
              <button
                className="remove-button"
                type="button"
                onClick={onRemoveCartItem}
                data-testid="remove"
              >
                Remove
              </button>
            </div>
          </div>
          <button
            className="delete-button"
            type="button"
            onClick={onRemoveCartItem}
          >
            <AiFillCloseCircle color="#616E7C" size={20} />
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem

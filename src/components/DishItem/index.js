import {Component} from 'react'
import {FaCircle} from 'react-icons/fa'
import './index.css'
import CartContext from '../../context/CartContext'

class DishItem extends Component {
  state = {
    quantity: 0,
  }

  onIncrementQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  onDecrementQuantity = () => {
    const {quantity} = this.state
    if (quantity > 0) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {quantity} = this.state
          const {dishDetails} = this.props
          const {
            addonCat,
            dishAvailability,
            dishCalories,
            dishCurrency,
            dishDescription,
            dishImage,
            dishName,
            dishPrice,
          } = dishDetails
          const {addCartItem} = value
          const availabilityClassName = dishAvailability
            ? 'available-symbol-container'
            : 'unavailable-symbol-container'
          const iconColor = dishAvailability ? 'green' : 'red'
          const addDishToCart = dishAvailability && quantity > 0

          const onClickAddToCart = () => {
            addCartItem({...dishDetails, quantity})
          }

          return (
            <li className="dish-item">
              <div className={availabilityClassName}>
                <FaCircle color={iconColor} size="50px" />
              </div>
              <div className="content-container">
                <h1 className="dish-name">{dishName}</h1>
                <p className="dish-currency">
                  {dishCurrency} {dishPrice}
                </p>
                <p className="description">{dishDescription}</p>
                {dishAvailability ? (
                  <div className="dish-quantity-container">
                    <button
                      className="btn"
                      type="button"
                      onClick={this.onDecrementQuantity}
                    >
                      -
                    </button>
                    <p className="dish-quantity">{quantity}</p>
                    <button
                      className="btn"
                      type="button"
                      onClick={this.onIncrementQuantity}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <p className="not-available">Not available</p>
                )}
                {addonCat.length === 0 ? null : (
                  <>
                    <p className="customizations">Customizations available</p>
                  </>
                )}
                {addDishToCart && (
                  <button
                    type="button"
                    className="add-btn"
                    onClick={onClickAddToCart}
                  >
                    ADD TO CART
                  </button>
                )}
              </div>
              <p className="calories">{dishCalories} calories</p>
              <img src={dishImage} alt={dishName} className="dish-image" />
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default DishItem

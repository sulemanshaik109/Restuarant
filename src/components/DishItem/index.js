import {FaCircle} from 'react-icons/fa'
import './index.css'

const DishItem = props => {
  const {dishDetails} = props
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
  const availabilityClassName = dishAvailability
    ? 'available-symbol-container'
    : 'unavailable-symbol-container'
  const iconColor = dishAvailability ? 'green' : 'red'
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
            <button className="btn" type="button">
              -
            </button>
            <p className="dish-quantity">0</p>
            <button className="btn" type="button">
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
      </div>
      <p className="calories">{dishCalories} calories</p>
      <img src={dishImage} alt={dishName} className="dish-image" />
    </li>
  )
}

export default DishItem

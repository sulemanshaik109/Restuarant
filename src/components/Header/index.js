import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import CartContext from '../../context/CartContext'

import './index.css'

const Header = props => {
  const {restaurantName} = props
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const renderCartItemsCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value

        return <p className="count">{cartList.length}</p>
      }}
    </CartContext.Consumer>
  )

  return (
    <div className="header-container">
      <Link to="/" className="link-item">
        <h1 className="main-heading">{restaurantName}</h1>
      </Link>
      <div className="my-orders-container">
        <p className="my-orders">My orders</p>
        <Link to="/cart" className="link-item">
          <AiOutlineShoppingCart color="#3b3d40" size={80} />
        </Link>
        <div className="count-container">{renderCartItemsCount()}</div>
        <button
          type="button"
          className="logout-desktop-btn"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Header

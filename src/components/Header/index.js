import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import CartContext from '../../context/CartContext'

import './index.css'

const Header = props => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const {restaurantName} = props
      const onClickLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      const onClickCartBtn = () => {
        const {history} = props
        history.replace('/cart')
      }

      return (
        <div className="header-container">
          <Link to="/" className="link-item">
            <h1 className="main-heading">{restaurantName}</h1>
          </Link>
          <div className="my-orders-container">
            <p className="my-orders">My orders</p>
            <button
              type="button"
              className="cart-btn"
              data-testid="cart"
              onClick={onClickCartBtn}
            >
              <AiOutlineShoppingCart color="#3b3d40" size={80} />
              <div className="count-container">
                <p className="count">{cartList.length}</p>
              </div>
            </button>
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
    }}
  </CartContext.Consumer>
)

export default Header

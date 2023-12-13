import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import CategoryItem from '../CategoryItem'
import DishItem from '../DishItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    restaurantData: {},
    apiStatus: apiStatusConstants.initial,
    activeCategory: '',
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getFormattedDishes = eachCategoryDish => ({
    dishId: eachCategoryDish.dish_id,
    dishName: eachCategoryDish.dish_name,
    dishPrice: eachCategoryDish.dish_price,
    dishImage: eachCategoryDish.dish_image,
    dishCurrency: eachCategoryDish.dish_currency,
    dishCalories: eachCategoryDish.dish_calories,
    dishDescription: eachCategoryDish.dish_description,
    dishAvailability: eachCategoryDish.dish_Availability,
    addonCat: eachCategoryDish.addonCat,
  })

  getFormattedMenuItems = eachMenuItem => ({
    menuCategory: eachMenuItem.menu_category,
    menuCategoryId: eachMenuItem.menu_category_id,
    categoryDishes: eachMenuItem.category_dishes.map(eachCategoryDish =>
      this.getFormattedDishes(eachCategoryDish),
    ),
  })

  getRestaurantDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const dishesApiUrl =
      'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(dishesApiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.map(data => ({
        restaurantName: data.restaurant_name,
        tableMenuList: data.table_menu_list.map(eachMenuItem =>
          this.getFormattedMenuItems(eachMenuItem),
        ),
      }))
      this.setState({
        restaurantData: updatedData[0],
        apiStatus: apiStatusConstants.success,
        activeCategory: updatedData[0].tableMenuList[0].menuCategoryId,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  clickCategory = id => {
    this.setState({activeCategory: id})
  }

  renderRestaurant = () => {
    const {restaurantData, activeCategory} = this.state
    const {restaurantName, tableMenuList} = restaurantData
    const activeCategoryDishes = tableMenuList.find(
      each => each.menuCategoryId === activeCategory,
    )
    const {history} = this.props
    return (
      <>
        <Header restaurantName={restaurantName} history={history} />
        <ul className="categories-list">
          {tableMenuList.map(menuItem => (
            <CategoryItem
              key={menuItem.menuCategoryId}
              categoryId={menuItem.menuCategoryId}
              category={menuItem.menuCategory}
              isActive={activeCategory === menuItem.menuCategoryId}
              clickCategory={this.clickCategory}
            />
          ))}
        </ul>
        <ul className="dishes-list">
          {activeCategoryDishes.categoryDishes.map(eachDish => (
            <DishItem key={eachDish.dishId} dishDetails={eachDish} />
          ))}
        </ul>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="products-failure-view-container">
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderRestaurantApp = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurant()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderRestaurantApp()}</>
  }
}

export default Home

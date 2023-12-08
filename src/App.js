import {Component} from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import CategoryItem from './components/CategoryItem'
import DishItem from './components/DishItem'
import './App.css'

class App extends Component {
  state = {
    restaurantData: {},
    apiStatus: 'inProgress',
    activeCategory: '',
    count: 0,
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
    const response = await fetch(
      'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc',
    )
    const fetchedData = await response.json()
    const updatedData = fetchedData.map(data => ({
      restaurantName: data.restaurant_name,
      tableMenuList: data.table_menu_list.map(eachMenuItem =>
        this.getFormattedMenuItems(eachMenuItem),
      ),
    }))
    this.setState({
      restaurantData: updatedData[0],
      apiStatus: 'success',
      activeCategory: updatedData[0].tableMenuList[0].menuCategoryId,
    })
  }

  clickCategory = id => {
    this.setState({activeCategory: id})
  }

  renderRestaurant = () => {
    const {restaurantData, activeCategory, count} = this.state
    const {restaurantName, tableMenuList} = restaurantData
    const activeCategoryDishes = tableMenuList.find(
      each => each.menuCategoryId === activeCategory,
    )
    return (
      <>
        <div className="header-container">
          <h1 className="main-heading">{restaurantName}</h1>
          <div className="my-orders-container">
            <p className="my-orders">My orders</p>
            <AiOutlineShoppingCart color="#3b3d40" size={80} />
            <div className="count-container">
              <p className="count">{count}</p>
            </div>
          </div>
        </div>
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

  renderRestaurantApp = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'success':
        return this.renderRestaurant()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderRestaurantApp()}</>
  }
}

export default App

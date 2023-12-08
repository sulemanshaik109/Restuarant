import './index.css'

const CategoryItem = props => {
  const {category, isActive, clickCategory, categoryId} = props
  const activeCategory = isActive ? 'active-category' : ''
  const onClickCategory = () => {
    clickCategory(categoryId)
  }
  return (
    <li className="category-item">
      <button
        type="button"
        className={`category-btn ${activeCategory}`}
        onClick={onClickCategory}
      >
        {category}
      </button>
    </li>
  )
}

export default CategoryItem

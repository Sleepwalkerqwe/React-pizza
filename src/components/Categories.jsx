import React from 'react';

function Categories() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const onClickedCategory = (currentIndex) => {
    setActiveIndex(currentIndex);
  };

  const pizzaCategories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Сырные'];

  return (
    <div className="categories">
      <ul>
        {pizzaCategories.map((value, i) => (
          <li onClick={() => onClickedCategory(i)} className={activeIndex === i ? 'active' : ''}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;

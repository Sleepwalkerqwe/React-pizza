import React from 'react';

type CategoriesProps = {
  categoryValue: number;
  onClickCategory: any;
};

const Categories: React.FC<CategoriesProps> = ({ categoryValue, onClickCategory }) => {
  const pizzaCategories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Сырные'];

  return (
    <div className="categories">
      <ul>
        {pizzaCategories.map((categoryName, i) => (
          <li key={i} onClick={() => onClickCategory(i)} className={categoryValue === i ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;

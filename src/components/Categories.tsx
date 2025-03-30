import React from 'react';

type CategoriesProps = {
  categoryValue: number;
  onClickCategory: (i: number) => void;
  getCategories?: (pizzaCategories: string[]) => void;
};

const pizzaCategories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Сырные'];

const Categories: React.FC<CategoriesProps> = ({ getCategories, categoryValue, onClickCategory }) => {
  getCategories?.(pizzaCategories);

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

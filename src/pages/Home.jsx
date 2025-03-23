import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = ({ searchValue }) => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [categoryId, setCategoryId] = React.useState(0);
  const [sortCategory, setSortCategory] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sortCategory.sortProperty.replace('-', '');
    const order = sortCategory.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    const url = new URL(`https://67dc1e101fd9e43fe47746ea.mockapi.io/items`);

    url.searchParams.append('', category);
    url.searchParams.append('sortBy', sortBy);
    url.searchParams.append('order', order);
    url.searchParams.append('', search);

    fetch(url)
      // fetch(`https://67dc1e101fd9e43fe47746ea.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`)
      .then((res) => res.json())
      .then((arr) => {
        console.log(arr);

        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortCategory, searchValue]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(10)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryValue={categoryId} onClickCategory={(id) => setCategoryId(id)} />
        <Sort sortValue={sortCategory} onChangeSort={(id) => setSortCategory(id)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
    </div>
  );
};

export default Home;

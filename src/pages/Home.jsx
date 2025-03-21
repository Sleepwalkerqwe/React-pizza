import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('https://67dc1e101fd9e43fe47746ea.mockapi.io/items')
      .then((res) => res.json())

      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? [...new Array(10)].map((_, index) => <Skeleton key={index} />) : items.map((obj) => <PizzaBlock key={obj.id} {...obj}></PizzaBlock>)}
        {items.map((obj) => (isLoading ? <Skeleton /> : <PizzaBlock key={obj.id} {...obj} />))}
        {/* // <Skeleton key={obj.id} {...obj} />
            // <PizzaBlock key={obj.id} title={obj.title} price={obj.price} imageUrl={obj.imageUrl} types={obj.types} sizes={obj.sizes} /> */}
      </div>
    </>
  );
};

export default Home;

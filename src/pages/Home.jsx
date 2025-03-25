import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCategoryId, setSort } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/index';

import { SearсhContext } from '../App';

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort } = useSelector((state) => state.filterReducer);
  const { searchValue } = React.useContext(SearсhContext);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [currentPage, setCurrentPage] = React.useState(1);

  const onChangeCategory = (id) => {
    console.log(id);
    dispatch(setCategoryId(id));
  };

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';

    // const search = searchValue ? `&search=${searchValue}` : '';

    // const url = new URL(`https://67dc1e101fd9e43fe47746ea.mockapi.io/items`);
    const url = new URL(`https://67dc1e101fd9e43fe47746ea.mockapi.io/items?limit=4&`);

    url.searchParams.append('', category);
    url.searchParams.append('sortBy', sortBy);
    url.searchParams.append('order', order);
    // url.searchParams.append('&', search);

    fetch(url)
      // fetch(`https://67dc1e101fd9e43fe47746ea.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`)
      .then((res) => res.json())
      .then((arr) => {
        setIsLoading(false);
        setItems(arr);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(10)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryValue={categoryId} onClickCategory={(id) => onChangeCategory(id)} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;

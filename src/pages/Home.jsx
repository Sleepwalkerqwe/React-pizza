import React from 'react';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/index';

import { SearсhContext } from '../App';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage } = useSelector((state) => state.filterReducer);

  const { searchValue } = React.useContext(SearсhContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onChangeCategory = (id) => {
    console.log(id);
    dispatch(setCategoryId(id));
  };
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchPizzas = () => {
    setIsLoading(true);

    const category = categoryId > 0 ? `${categoryId}` : '';
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? searchValue : '';

    const url = new URL(`https://67dc1e101fd9e43fe47746ea.mockapi.io/items?page=${currentPage}&limit=4`);

    url.searchParams.append('category', category);
    url.searchParams.append('sortBy', sortBy);
    url.searchParams.append('order', order);
    url.searchParams.append('search', search);

    axios.get(url).then((res) => {
      setIsLoading(false);
      setItems(res.data);
      // console.log(res);
    });

    window.scrollTo(0, 0);
  };

  // Если изменили параметры и был первый рендер, то -> | если еще не было первого рендера, то не нужно вшивать в URL какие-либо параметры
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      // console.log(queryString);
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  // Если был первый реднер, то проверяем URL параметры и сохраняем в redux. при первом рендере мы будем парсить все параметры и превратим их в обьект, а потом все это передадим в редакс
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);
  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
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
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;

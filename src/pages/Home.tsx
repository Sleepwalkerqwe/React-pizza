import React from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { filterSliceState, setCategoryId, setCurrentPage, setFilters, SortPropertyEnum } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/index';

import { fetchPizzas, PizzaItem, PizzasItemParams, Status } from '../redux/slices/pizzaSlice';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage, searchValue } = useSelector((state: { filterReducer: { categoryId: number; sort: { name: string; sortProperty: SortPropertyEnum }; currentPage: number; searchValue: string } }) => state.filterReducer);

  const { items, status } = useSelector((state: { pizza: { items: []; status: Status } }) => state.pizza);

  const onChangeCategory = (id: number) => {
    console.log(id);
    dispatch(setCategoryId(id));
  };
  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const category = categoryId > 0 ? `${categoryId}` : '';
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? searchValue : '';

    dispatch(fetchPizzas({ category, sortBy, order, search, currentPage }));

    window.scrollTo(0, 0);
  };

  // Если изменили параметры и был первый рендер, то -> | если еще не было первого рендера, то не нужно вшивать в URL какие-либо параметры
  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryId,
  //       currentPage,
  //     });
  //     // console.log(queryString);
  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sort.sortProperty, currentPage]);

  // Если был первый реднер, то проверяем URL параметры и сохраняем в redux. при первом рендере мы будем парсить все параметры и превратим их в обьект, а потом все это передадим в редакс
  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as PizzasItemParams;
  //     const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

  //     dispatch(setFilters({ searchValue: params.search, categoryId: Number(params.category), currentPage: Number(params.currentPage), sort: sort || sortList[0] }));
  //     isSearch.current = true;
  //   }
  // }, []);
  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    getPizzas();
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((obj: PizzaItem) => <PizzaBlock {...obj} />);

  const skeletons = [...new Array(10)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryValue={categoryId} onClickCategory={(id) => onChangeCategory(id)} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__eror-info">
          <h2>Произошла ошибка, 😕</h2>
          <p>не удалось получить пиццы, попробуйте когда-нибудь потом</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;

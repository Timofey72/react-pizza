import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import {
  selectFilter,
  selectSearchValue,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import {
  SearchPizzaParams,
  Status,
  fetchPizzas,
  selectPizzaData,
} from '../redux/slices/pizzaSlice';
import Categories from '../components/Categories';
import Sort, { sortBy } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMounted = useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const searchValue = useSelector(selectSearchValue);
  const { categoryId, sort, currentPage } = useSelector(selectFilter);
  const sortType = sort.sortProperty;

  const skeletons = [...new Array(8)].map((_, i) => <PizzaSkeleton key={i} />);
  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
    setCurrentPage(page);
  };

  const getPizzas = async () => {
    const category = categoryId !== 0 ? `&category=${categoryId}` : '';
    const sort = `&sortBy=${sortType.replace('-', '')}`;
    const order = `&order=${sortType.includes('-') ? 'asc' : 'desc'}`;
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(fetchPizzas({ currentPage, category, sort, order, search }));
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
      const sort = sortBy.find((obj) => obj.sortProperty === params.sort);

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: params.currentPage,
          sort: sort || sortBy[0],
        }),
      );
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    getPizzas();
  }, [categoryId, sortType, currentPage, searchValue]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType,
        category: categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage, searchValue]);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories category={categoryId} onClickCategory={onChangeCategory} />
        <Sort sort={sort} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      {status === 'error' ? (
        <div className='content__error-info'>
          <h2>
            <span>🔨</span>
            <br />
            Произошла ошибка :(
          </h2>
          <p>Попробуйте повторить попытку через пару минут.</p>
        </div>
      ) : (
        <div className='content__items'>{status === Status.LOADING ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;

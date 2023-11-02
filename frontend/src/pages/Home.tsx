import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/filter/slice';

import { useAppDispatch } from '../redux/store';
import { selectFilter, selectSearchValue } from '../redux/filter/selectors';
import { selectPizzaData } from '../redux/pizza/selectors';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { SearchPizzaParams, Status } from '../redux/pizza/types';

import Categories from '../components/Categories';
import Sort, { sortBy } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMounted = useRef(false);

  const { count_page, items, status } = useSelector(selectPizzaData);
  const searchValue = useSelector(selectSearchValue);
  const { categoryId, ordering, currentPage } = useSelector(selectFilter);
  const sortType = ordering.sortProperty;

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
    const ordering = `&ordering=${sortType}`;
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(fetchPizzas({ currentPage, category, ordering, search }));
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
      const ordering = sortBy.find((obj) => obj.sortProperty === params.ordering);

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: params.currentPage,
          ordering: ordering || sortBy[0],
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
        <Sort sort={ordering} />
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

      <Pagination count_page={count_page} currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;

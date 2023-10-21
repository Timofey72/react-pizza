import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import { selectFilter, selectSearchValue, setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';
import Categories from '../components/Categories';
import Sort, { sortBy } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const searchValue = useSelector(selectSearchValue);
  const { categoryId, sort, currentPage } = useSelector(selectFilter);
  const sortType = sort.sortProperty;
  
  const skeletons = [...new Array(8)].map((_, i) => <PizzaSkeleton key={i} />);
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
    setCurrentPage(number);
  };

  const getPizzas = async () => {
    const category = categoryId !== 0 ? `category=${categoryId}` : '';
    const sort = `&sortBy=${sortType.replace('-', '')}`;
    const order = `&order=${sortType.includes('-') ? 'asc' : 'desc'}`;
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(fetchPizzas({ currentPage, category, sort, order, search }));
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortBy.find((obj) => obj.sortProperty === params.sortType);

      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, currentPage, searchValue]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType,
        categoryId,
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
        <Sort />
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
        <div className='content__items'>{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;

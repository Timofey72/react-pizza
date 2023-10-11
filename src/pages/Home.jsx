import { useState, useEffect, useContext } from 'react';
import { SearchContext } from '../App';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home = () => {
  const { searchValue } = useContext(SearchContext);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeSort, setActiveSort] = useState({ name: 'популярности  🠟', sortProperty: 'rating' });

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId !== 0 ? `category=${categoryId}` : '';
    const sort = `&sortBy=${activeSort.sortProperty.replace('-', '')}`;
    const order = `&order=${activeSort.sortProperty.includes('-') ? 'asc' : 'desc'}`;

    fetch(`https://65200797906e276284c3eccc.mockapi.io/items?page=${currentPage}&limit=8&${category}${sort}${order}`)
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
    window.scrollTo(0, 0);
  }, [categoryId, activeSort, currentPage]);

  const skeletons = [...new Array(8)].map((_, i) => <PizzaSkeleton key={i} />);
  const pizzas = items
    .filter((obj) => {
      return obj.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories category={categoryId} onClickCategory={(id) => setCategoryId(id)} />
        <Sort activeSort={activeSort} onChangeSort={(id) => setActiveSort(id)} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={number => setCurrentPage(number)} />
    </div>
  );
};

export default Home;

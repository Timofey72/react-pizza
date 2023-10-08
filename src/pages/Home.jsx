import { useState, useEffect } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/Skeleton';

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [activeSort, setActiveSort] = useState({ name: 'популярности  🠟', sortProperty: 'rating' });

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId !== 0 ? `category=${categoryId}` : '';
    const sort = `&sortBy=${activeSort.sortProperty.replace('-', '')}`;
    const order = `&order=${activeSort.sortProperty.includes('-') ? 'asc' : 'desc'}`;

    fetch(`https://65200797906e276284c3eccc.mockapi.io/items?${category}${sort}${order}`)
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
    window.scrollTo(0, 0);
  }, [categoryId, activeSort]);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories category={categoryId} onClickCategory={(id) => setCategoryId(id)} />
        <Sort activeSort={activeSort} onChangeSort={(id) => setActiveSort(id)} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoading
          ? [...new Array(8)].map((_, i) => <PizzaSkeleton key={i} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};

export default Home;

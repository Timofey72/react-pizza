import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import NotFound from '../NotFound';

import styles from './SinglePizza.module.scss';

const SinglePizza = () => {
  const [pizza, setPizza] = useState();
  const [error, isError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function getPizzaData() {
      try {
        const { data } = await axios.get(`https://65200797906e276284c3eccc.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (error) {
        isError(true);
      }
    }

    getPizzaData();
  }, []);

  if (error) {
    return <NotFound />;
  } else if (!pizza) {
    return;
  }

  return (
    <div className={`container ${styles.root}`}>
      <img className={styles.image} src={pizza.imageUrl} alt={`pizza-${pizza.title}`} />
      <h2 className={styles.title}>{pizza.title}</h2>
      <h4 className={styles.price}>Цена: {pizza.price} ₽</h4>
      <Link to='/'>
        <button className={styles.button}>В главное меню</button>
      </Link>
    </div>
  );
};

export default SinglePizza;

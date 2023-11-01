import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import NotFound from '../NotFound';

import styles from './SinglePizza.module.scss';
import Spinner from '../../components/Spinner/Spinner';

const SinglePizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    image: string;
    title: string;
    price: number;
  }>();
  const [error, isError] = useState<boolean>(false);
  const { id } = useParams();

  useEffect(() => {
    async function getPizzaData() {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/v1/pizzas/${id}`);
       setPizza(data.pizzas[0]);
      } catch (error) {
        isError(true);
      }
    }

    getPizzaData();
  }, []);

  if (error) {
    return <NotFound />;
  } else if (!pizza) {
    return <Spinner />;
  }

  return (
    <div className={`container ${styles.root}`}>
      <img className={styles.image} src={pizza.image} alt={`pizza-${pizza.title}`} />
      <h2 className={styles.title}>{pizza.title}</h2>
      <h4 className={styles.price}>Цена: {pizza.price} ₽</h4>
      <Link to='/'>
        <button className={styles.button}>В главное меню</button>
      </Link>
    </div>
  );
};

export default SinglePizza;

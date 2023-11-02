import React from 'react';

import spinnerImage from '../../assets/img/spinner.svg';

import styles from './Spinner.module.scss';

const Spinner: React.FC = () => {
  return <img className={styles.root} src={spinnerImage} alt='spinner' />;
};

export default Spinner;

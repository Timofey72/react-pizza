import { useState, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';

import { setSearchValue } from '../../redux/slices/filterSlice';
import styles from './Search.module.scss';

import searchIcon from '../../assets/img/searchIcon.svg';
import clearIcon from '../../assets/img/clearIcon.svg';

const Search = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState('');
  const inputRef = useRef();

  const onClear = () => {
    setValue('');
    dispatch(setSearchValue(''));
    inputRef.current.focus();
  };

  const updateSearchValue = useCallback(
    debounce((value) => {
      dispatch(setSearchValue(value));
    }, 300),
    [],
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <img className={styles.icon} src={searchIcon} alt='search' />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        type='text'
        placeholder='Найти пиццу...'
      />
      {value && <img onClick={onClear} className={styles.clearIcon} src={clearIcon} alt='close' />}
    </div>
  );
};

export default Search;

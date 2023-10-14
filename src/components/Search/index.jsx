import { useState, useRef, useContext, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { SearchContext } from '../../App';

import styles from './Search.module.scss';

import searchIcon from '../../assets/img/searchIcon.svg';
import clearIcon from '../../assets/img/clearIcon.svg';

const Search = () => {
  const [value, setValue] = useState('');
  const { setSearchValue } = useContext(SearchContext);
  const inputRef = useRef();

  const onClear = () => {
    setValue('');
    setSearchValue('');
    inputRef.current.focus();
  };

  const updateSearchValue = useCallback(
    debounce((value) => {
      setSearchValue(value);
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
      {value && (
        <img onClick={onClear} className={styles.clearIcon} src={clearIcon} alt='close' />
      )}
    </div>
  );
};

export default Search;

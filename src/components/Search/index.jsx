import { useRef, useContext } from 'react';
import { SearchContext } from '../../App';

import styles from './Search.module.scss';

import searchIcon from '../../assets/img/searchIcon.svg';
import clearIcon from '../../assets/img/clearIcon.svg';

const Search = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const inputRef = useRef(null);

  const onClear = () => {
    setSearchValue('');
    inputRef.current.focus();
  };

  return (
    <div className={styles.root}>
      <img className={styles.icon} src={searchIcon} alt='search' />
      <input
        ref={inputRef}
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        className={styles.input}
        type='text'
        placeholder='Найти пиццу...'
      />
      {searchValue && (
        <img onClick={onClear} className={styles.clearIcon} src={clearIcon} alt='close' />
      )}
    </div>
  );
};

export default Search;

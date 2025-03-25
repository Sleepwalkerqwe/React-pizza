import React from 'react';

import searchIcon from '../../assets/img/search-icon.svg';
import closeIcon from '../../assets/img/close-icon.svg';

import styles from './Search.module.scss';

import { SearсhContext } from '../../App';

const Search = () => {
  const { searchValue, setSearchValue } = React.useContext(SearсhContext);
  return (
    <div className={styles.root}>
      <img className={styles.icon} src={searchIcon} alt="Search logo" />
      <input value={searchValue} onChange={(event) => setSearchValue(event.target.value)} className={styles.input} placeholder="Поиск пиццы..." />;{/*  */}
      {searchValue && <img onClick={() => setSearchValue()} className={styles.closeIcon} src={closeIcon} alt="Close logo" />}
    </div>
  );
};

export default Search;

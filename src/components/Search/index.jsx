import React from 'react';
import debounce from 'lodash.debounce';

import searchIcon from '../../assets/img/search-icon.svg';
import closeIcon from '../../assets/img/close-icon.svg';

import styles from './Search.module.scss';

import { SearсhContext } from '../../App';

const Search = () => {
  const [value, setValue] = React.useState('');

  const { setSearchValue } = React.useContext(SearсhContext);
  const inputRef = React.useRef();

  const onClickClear = () => {
    setSearchValue('');
    setValue('');
    // document.querySelector('input').focus();
    inputRef.current.focus();
  };

  const updateSearchInput = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 250),
    []
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchInput(event.target.value);
  };

  React.useEffect(() => {
    document.querySelector('input');
  }, []);

  return (
    <div className={styles.root}>
      <img className={styles.icon} src={searchIcon} alt="Search logo" />
      <input ref={inputRef} value={value} onChange={onChangeInput} className={styles.input} placeholder="Поиск пиццы..." />;{/*  */}
      {value && <img onClick={onClickClear} className={styles.closeIcon} src={closeIcon} alt="Close logo" />}
    </div>
  );
};

export default Search;

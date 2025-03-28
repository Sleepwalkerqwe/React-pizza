import React from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';

import searchIcon from '../../assets/img/search-icon.svg';
import closeIcon from '../../assets/img/close-icon.svg';

import styles from './Search.module.scss';

import { setSearchValue } from '../../redux/slices/filterSlice';

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');

  const inputRef = React.useRef();

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current.focus();
  };

  const updateSearchInput = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
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

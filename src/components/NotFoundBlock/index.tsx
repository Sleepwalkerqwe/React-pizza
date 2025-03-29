import React from 'react';

import styles from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.main}>
      <h1>
        <span>🥺</span>
        <br />
        NotFoundBlock🥺
      </h1>
      <p>К сожалению данная страница отсутствует блаблабалбалотолфывафл</p>
    </div>
  );
};

export default NotFoundBlock;

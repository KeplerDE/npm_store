// components/header/Header.js

import React from 'react';
import Top from './Top';
import styles from '@/styles/Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.coupon}>
        <img src="/images/banner.png" alt="Coupon Banner" className={styles.couponImage} />
      </div>
      <Top />
    </header>
  );
};

export default Header;

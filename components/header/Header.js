import React from 'react';
import Top from './Top';
import Search from './Search';
import styles from '@/styles/Header.module.scss';

const Header = () => {
  const handleSearch = (query) => {
    console.log('Search query:', query);
  };

  return (
    <header className={styles.header}>
      <div className={styles.coupon}>
        <img src="/images/banner.png" alt="Coupon Banner" className={styles.couponImage} />
      </div>
      <Top />
      <Search onSearch={handleSearch} />
    </header>
  );
};

export default Header;

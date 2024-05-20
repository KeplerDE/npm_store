import React from 'react';
import Top from './Top';
import Search from './Search';
import styles from '@/styles/Header.module.scss';

const Header = ({ country }) => {
  const handleSearch = (query) => {
    console.log('Search query:', query);
  };

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.coupon}>
          <img src="/images/banner.png" alt="Coupon Banner" className={styles.couponImage} />
        </div>
        <Top country={country} />
        <Search onSearch={handleSearch} />
      </header>
    </div>
  );
};

export default Header;

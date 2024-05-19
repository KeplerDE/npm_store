import React, { useState } from 'react';
import styles from '@/styles/Search.module.scss';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className={styles.searchContainer}>
      <img src="/images/logo.png" alt="Logo" className={styles.logo} />
      <form className={styles.search} onSubmit={handleSearch}>
        <input 
          type="text" 
          placeholder="Search..." 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          <FaSearch />
        </button>
      </form>
      <div className={styles.cartContainer}>
        <FaShoppingCart className={styles.cartIcon} />
        <span className={styles.cartCount}>0</span>
      </div>
    </div>
  );
};

export default Search;

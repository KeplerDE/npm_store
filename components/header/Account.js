import React from 'react';
import styles from '@/styles/Account.module.scss';
import { RiAccountPinCircleLine, RiArrowDropDownFill } from 'react-icons/ri';

const Account = ({ loggedIn }) => {
  return (
    <div className={styles.menu}>
      <h4>Welcome to Shoppay!</h4>
      {loggedIn ? (
        <div className={styles.flex}>
          <img src="https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png" alt="User Avatar" className={styles.menu_img} />
          <div className={styles.col}>
            <span>Welcome Back,</span>
            <h3>M74JJI</h3>
            <button className={styles.signOutBtn}>Sign out</button>
          </div>
        </div>
      ) : (
        <div className={styles.flex}>
          <button className={styles.authBtn}>Register</button>
          <button className={styles.authBtn}>Login</button>
        </div>
      )}
      <ul className={styles.menuList}>
        <li><a href="/profile" className={styles.menuItem}>Account</a></li>
        <li><a href="/profile/orders" className={styles.menuItem}>My Orders</a></li>
        <li><a href="/profile/messages" className={styles.menuItem}>Message Center</a></li>
        <li><a href="/profile/address" className={styles.menuItem}>Address</a></li>
        <li><a href="/profile/whishlist" className={styles.menuItem}>Wishlist</a></li>
      </ul>
    </div>
  );
};

export default Account;

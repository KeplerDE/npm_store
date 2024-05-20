import React, { useState } from 'react';
import styles from '@/styles/Top.module.scss';
import { MdSecurity } from 'react-icons/md';
import { BsSuitHeart } from 'react-icons/bs';
import { RiAccountPinCircleLine, RiArrowDropDownFill } from 'react-icons/ri';
import Account from './Account';

const Top = ({ country }) => {
  const [loggedIn, setLoggedIn] = useState(false);  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const user = {
    nickname: "M74JJI",
    avatar: "https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png"
  };

  return (
    <div className={styles.top}>
      <div className={styles.top_container}>
        <div></div>
        <ul className={styles.top_list}>
          <li>
            <img src={country.flag} alt="" className={styles.flagIcon} />
            <span>{country.name}</span>
          </li>
          <li>
            <MdSecurity className={styles.icon} />
            <span>Buyer Protection</span>
          </li>
          <li>
            <span>Customer Service</span>
          </li>
          <li>
            <span>Help</span>
          </li>
          <li>
            <BsSuitHeart className={styles.icon} />
            <span>Wishlist</span>
          </li>
          <li
            className={styles.account}
            onMouseEnter={() => setIsMenuOpen(true)}
            onMouseLeave={() => setIsMenuOpen(false)}
          >
            <div className={styles.flex}>
              {loggedIn ? (
                <>
                  <img src={user.avatar} alt="User Avatar" className={styles.avatar} />
                  <span>{user.nickname}</span>
                </>
              ) : (
                <>
                  <RiAccountPinCircleLine className={styles.icon} />
                  <span>Account</span>
                </>
              )}
              <RiArrowDropDownFill className={styles.icon} />
            </div>
            {isMenuOpen && <Account loggedIn={loggedIn} />}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Top;

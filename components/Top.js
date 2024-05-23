import React, { useState } from 'react';
import styles from '@/styles/Top.module.scss';
import { MdSecurity } from 'react-icons/md';
import { BsSuitHeart } from 'react-icons/bs';
import { RiAccountPinCircleLine, RiArrowDropDownFill } from 'react-icons/ri';
import Account from './Account';
import { useSession } from 'next-auth/react';

const Top = ({ country }) => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={styles.top}>
      <div className={styles.top_container}>
        <div></div>
        <ul className={styles.top_list}>
          <li>
            <img src=""alt="" className={styles.flagIcon} />
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
              {session ? (
                <>
                  <img src="" alt="User Avatar" className={styles.avatar} />
                  <span>{session.user.name}</span>
                </>
              ) : (
                <>
                  <RiAccountPinCircleLine className={styles.icon} />
                  <span>Account</span>
                </>
              )}
              <RiArrowDropDownFill className={styles.icon} />
            </div>
            {isMenuOpen && <Account loggedIn={session} />}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Top;

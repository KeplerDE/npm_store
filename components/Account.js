import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import styles from '@/styles/Account.module.scss';

const Account = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleRegister = () => {
    router.push('/api/auth/signin');
  };

  const handleLogin = () => {
    router.push('/api/auth/signin');
  };

  if (!session) {
    return (
      <div className={styles.menu}>
        <h4>Welcome to Shoppay!</h4>
        <div className={styles.flex}>
          <button onClick={handleRegister} className={styles.authBtn}>Register</button>
          <button onClick={handleLogin} className={styles.authBtn}>Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.menu}>
      <h4>Welcome to Shoppay!</h4>
      <div className={styles.flex}>
        <img
          src={session.user.image || "https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png"}
          alt="User Avatar"
          className={styles.menu_img}
        />
        <div className={styles.col}>
          <span>Welcome Back,</span>
          <h3>{session.user.name}</h3>
          <button onClick={() => signOut()} className={styles.signOutBtn}>Sign out</button>
        </div>
      </div>
      <ul className={styles.menuList}>
        <li><a href="/profile" className={styles.menuItem}>Account</a></li>
        <li><a href="/profile/orders" className={styles.menuItem}>My Orders</a></li>
        <li><a href="/profile/messages" className={styles.menuItem}>Message Center</a></li>
        <li><a href="/profile/address" className={styles.menuItem}>Address</a></li>
        <li><a href="/profile/wishlist" className={styles.menuItem}>Wishlist</a></li>
      </ul>
    </div>
  );
};

export default Account;

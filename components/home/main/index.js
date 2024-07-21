import React from 'react';
import styles from "../../../styles/Home.module.scss";
import MainSwiper from "./swiper";
import OffersSwiper from "./offers";
import Menu from "./menu";
import User from "./User";  

export default function Main() {
  return (
    <div className={styles.main}>
      <div className={styles.header}>header</div>
      <div className={styles.menu}>
        <Menu />
      </div>
      <MainSwiper />
      <div className={styles.offers}>
        <OffersSwiper />
      </div>
      <div className={styles.user}>
        <User />  
      </div>
    </div>
  );
}

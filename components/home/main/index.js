import React from 'react';
import styles from "../../../styles/Home.module.scss";
import MainSwiper from "./swiper";
import OffersSwiper from "./offers";

export default function Main() {
  return (
    <div className={styles.main}>
      <div className={styles.header}>header</div>
      <div className={styles.menu}>menu</div>
      <MainSwiper />
      <div className={styles.offers}>
        <OffersSwiper />
      </div>
      <div className={styles.user}>user</div>
    </div>
  );
}

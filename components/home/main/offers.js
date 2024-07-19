import React from 'react';
import styles from './offers.module.scss';

const defaultOffers = [
  { id: 1, imageUrl: "/images/offers/offer1.jpg" },
  { id: 2, title: "Offer 2", description: "This is the second offer", imageUrl: "/images/offers/offer2.jpg" },
  { id: 3, title: "Offer 3", description: "This is the third offer", imageUrl: "/images/offers/offer3.jpg" }
];

export default function Offers() {
  return (
    <div className={styles.offers}>
      {defaultOffers.map(offer => (
        <div key={offer.id} className={styles['offer-item']}>
          <img src={offer.imageUrl} alt={offer.title} className={styles['offer-image']} />
          <h3>{offer.title}</h3>
          <p>{offer.description}</p>
        </div>
      ))}
    </div>
  );
}

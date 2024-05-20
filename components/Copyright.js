import React from 'react';
import styles from '@/styles/Copyright.module.scss';
import { IoLocationSharp } from 'react-icons/io5';

const Copyright = ({ country }) => {
  return (
    <div className={styles.copyright}>
      <div className={styles.paymentMethods}>
        <h3>WE ACCEPT</h3>
        <div className={styles.logos}>
          <img src="/images/visa.png" alt="Visa" />
          <img src="/images/mastercard.png" alt="MasterCard" />
          <img src="/images/paypal.png" alt="PayPal" />
        </div>
      </div>
      <div className={styles.rights}>
        <p>&copy; {new Date().getFullYear()} SHOPPAY All Rights Reserved.</p>
      </div>
      <div className={styles.country}>
        <IoLocationSharp className={styles.icon} />
        <span className={styles.countryName}>{country.name}</span>
      </div>
      <div className={styles.policies}>
        <a href="/privacy-center">Privacy Center</a> |
        <a href="/privacy-policy">Privacy & Cookie Policy</a> |
        <a href="/manage-cookies">Manage Cookies</a> |
        <a href="/terms-conditions">Terms & Conditions</a> |
        <a href="/copyright-notice">Copyright Notice</a>
      </div>
    </div>
  );
};

export default Copyright;

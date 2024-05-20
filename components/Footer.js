import React from 'react';
import Social from './Social';
import Copyright from './Copyright';
import styles from '@/styles/Footer.module.scss';

const Footer = ({ country }) => {
  return (
    <div>
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.section}>
            <img src="/images/logo.png" alt="Logo" className={styles.logo} />
            <ul>
              <li><a href="/about">About us</a></li>
              <li><a href="/contact">Contact us</a></li>
              <li><a href="/social-responsibility">Social Responsibility</a></li>
            </ul>
          </div>
          <div className={styles.section}>
            <h3>HELP & SUPPORT</h3>
            <ul>
              <li><a href="/shipping-info">Shipping Info</a></li>
              <li><a href="/returns">Returns</a></li>
              <li><a href="/how-to-order">How To Order</a></li>
              <li><a href="/how-to-track">How To Track</a></li>
              <li><a href="/size-guide">Size Guide</a></li>
            </ul>
          </div>
          <div className={styles.section}>
            <h3>Customer service</h3>
            <ul>
              <li><a href="/customer-service">Customer service</a></li>
              <li><a href="/terms-and-conditions">Terms and Conditions</a></li>
              <li><a href="/consumers">Consumers (Transactions)</a></li>
              <li><a href="/feedback-survey">Take our feedback survey</a></li>
            </ul>
          </div>
        </div>
      </footer>
      <Social />
      <Copyright country={country}/>
    </div>
  );
};

export default Footer;

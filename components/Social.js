import React, { useState } from 'react';
import styles from '@/styles/Social.module.scss';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaPinterest, FaSnapchat, FaTiktok } from 'react-icons/fa';

const Social = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Subscribed with email:', email);
    setEmail(''); // Clear the input field
  };

  return (
    <div className={styles.social}>
      <div className={styles.socialContainer}>
        <div className={styles.socialLinks}>
          <h3>STAY CONNECTED</h3>
          <div className={styles.icons}>
            <a href="https://www.facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://www.twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://www.instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.youtube.com" aria-label="YouTube" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
            <a href="https://www.pinterest.com" aria-label="Pinterest" target="_blank" rel="noopener noreferrer"><FaPinterest /></a>
            <a href="https://www.snapchat.com" aria-label="Snapchat" target="_blank" rel="noopener noreferrer"><FaSnapchat /></a>
            <a href="https://www.tiktok.com" aria-label="TikTok" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
          </div>
        </div>
        <div className={styles.newsletter}>
          <h3>SIGN UP FOR OUR NEWSLETTER</h3>
          <form onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Your Email Address" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className={styles.emailInput}
            />
            <button type="submit" className={styles.subscribeButton}>SUBSCRIBE</button>
          </form>
          <p>By clicking the SUBSCRIBE button, you are agreeing to our <a href="/privacy-policy">Privacy & Cookie Policy</a></p>
        </div>
      </div>
    </div>
  );
};

export default Social;

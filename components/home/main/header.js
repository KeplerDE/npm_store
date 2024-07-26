import Link from 'next/link';
import styles from './header.module.scss';

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <ul className={styles.headerNav}>
        <li>
          <Link href="/store" passHref>
            <span className={styles.navLink}>Store</span>
          </Link>
        </li>
        <li>
          <Link href="/electronics" passHref>
            <span className={styles.navLink}>Electronics</span>
          </Link>
        </li>
        <li>
          <Link href="/watches" passHref>
            <span className={styles.navLink}>Watches</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

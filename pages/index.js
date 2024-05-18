import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import Header from '../components/header/Header';

export default function Home() {
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </main>
    </div>
  );
}

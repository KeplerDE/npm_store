import styles from '../styles/Home.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Next.js!
        </h1>
        <p className={styles.description}>
          Get started by editing <code className={styles.code}>pages/index.js</code>
        </p>
      </main>
    </div>
  );
}

// pages/signin.js

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';
import styles from '@/styles/signin.module.scss';

export async function getStaticProps() {
  // Логика для получения данных
  const data = {}; // Получите данные здесь

  return { props: { data } };
}

export default function SignIn({ data }) {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <LoginForm />
        <SignupForm />
      </div>
      <Footer />
    </>
  );
}

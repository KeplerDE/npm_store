import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';
import styles from '@/styles/signin.module.scss';

export default function SignIn() {
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

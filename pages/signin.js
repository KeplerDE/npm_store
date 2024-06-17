import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';
import styles from '@/styles/signin.module.scss';
import { getCsrfToken, getProviders, getSession } from 'next-auth/react';

export async function getServerSideProps(context) {
  const { req, query } = context;
  const session = await getSession({ req });
  const callbackUrl = query.callbackUrl || '/';

  if (session) {
    return {
      redirect: {
        destination: callbackUrl,
      },
    };
  }

  const csrfToken = await getCsrfToken(context);
  const providers = Object.values(await getProviders());

  return {
    props: {
      providers,
      csrfToken,
      callbackUrl,
    },
  };
}

export default function SignIn({ providers, csrfToken, callbackUrl }) {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <LoginForm title="Sign In" csrfToken={csrfToken} providers={providers} />
        <SignupForm />
      </div>
      <Footer />
    </>
  );
}

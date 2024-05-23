import Link from 'next/link';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { signIn, signOut, useSession } from "next-auth/react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from '@/styles/signin.module.scss';

export default function SignIn() {
  const { data: session, status } = useSession();

  return (
    <>
      <Header />
      <div className={styles.login_container}>
        {session ? (
          <div className={styles.login_header}>
            <div className={styles.back_svg}>
              <BiLeftArrowAlt />
            </div>
            <span className={styles.text}>
              We'd be happy to join us! <Link href="/store" className={styles.link}>Go Store</Link>
            </span>
          </div>
        ) : (
          <div className={styles.login_header}>
            <h1>Sign In</h1>
            <button onClick={() => signIn("google")}>Sign in with Google</button>
            <button onClick={() => signIn("facebook")}>Sign in with Facebook</button>
          </div>
        )}
      </div>
      <div className={styles.content}>
        {status === "loading" ? (
          <p>Loading...</p>
        ) : session ? (
          <>
            <h1>Dashboard</h1>
            <p>Signed in as {session.user.email}</p>
            <button onClick={() => signOut()}>Sign out</button>
          </>
        ) : (
          <></>
        )}
      </div>
      <Footer />
    </>
  );
}

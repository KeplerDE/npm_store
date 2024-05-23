import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { signIn } from "next-auth/react";
import styles from '@/styles/LoginForm.module.scss';

const LoginForm = () => {
  return (
    <div className={styles.login_section}>
      <div className={styles.header}>
        <div className={styles.back_svg}>
          <BiLeftArrowAlt />
        </div>
        <span className={styles.text}>
          We'd be happy to join us! <Link href="/store" className={styles.link}>Go Store</Link>
        </span>
      </div>
      <h1 className={styles.title}>Sign in</h1>
      <p className={styles.subtitle}>Get access to one of the best Eshopping services in the world.</p>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid email address').required('Required'),
          password: Yup.string().required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          // Вывод данных формы в консоль
          console.log('User Data:', values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Field type="email" name="email" placeholder="Email Address" className={styles.input} />
              <ErrorMessage name="email" component="div" className={styles.error} />
            </div>
            <div>
              <Field type="password" name="password" placeholder="Password" className={styles.input} />
              <ErrorMessage name="password" component="div" className={styles.error} />
            </div>
            <button type="submit" disabled={isSubmitting} className={styles.button}>
              Sign in
            </button>
            <p className={styles.forgot_password}>Forgot password ?</p>
            <p className={styles.or_continue}>Or continue with:</p>
            <button type="button" onClick={() => signIn("google")} className={`${styles.oauth_button} ${styles.google}`}>
              Sign in with Google
            </button>
            <button type="button" onClick={() => signIn("facebook")} className={`${styles.oauth_button} ${styles.facebook}`}>
              Sign in with Facebook
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;

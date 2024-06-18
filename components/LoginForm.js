import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { signIn, getCsrfToken, getProviders } from "next-auth/react";
import { useRouter } from 'next/router';
import styles from '@/styles/LoginForm.module.scss';

const LoginForm = ({ title, csrfToken, providers }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    login_email: '',
    login_password: '',
    success: '',
    error: ''
  });

  const { login_email, login_password, success, error } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginValidation = Yup.object({
    email: Yup.string().email('Enter a valid email address.').required('Email address is required.'),
    password: Yup.string().required('Enter your password.')
  });

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        csrfToken
      });

      if (result.error) {
        setUser({ ...user, error: result.error, success: '' });
        setLoading(false);
      } else {
        setUser({ ...user, success: 'Login successful!', error: '' });
        setLoading(false);
        router.push('/'); 
      }
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      setUser({ ...user, error: 'Something went wrong.', success: '' });
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.login_section}>
      <div className={styles.header}>
        <div className={styles.back_svg}>
          <BiLeftArrowAlt />
        </div>
        <span className={styles.text}>
          We'd be happy to have you join us! <Link href="/store" className={styles.link}>Go to Store</Link>
        </span>
      </div>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>Get access to one of the best e-commerce services in the world.</p>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginValidation}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="hidden" name="csrfToken" value={csrfToken} />
            <div>
              <Field type="email" name="email" placeholder="Email address" className={styles.input} />
              <ErrorMessage name="email" component="div" className={styles.error} />
            </div>
            <div>
              <Field type="password" name="password" placeholder="Password" className={styles.input} />
              <ErrorMessage name="password" component="div" className={styles.error} />
            </div>
            <button type="submit" disabled={isSubmitting || loading} className={styles.button}>
              Sign in
            </button>
            <Link href="/auth/forgot">
              <p className={styles.forgot_password}>Forgot password?</p>
            </Link>
            <p className={styles.or_continue}>Or continue with:</p>
            <div className={styles.login_socials_wrap}>
              {providers.map((provider) => {
                if (provider.name === 'Credentials') {
                  return null;
                }
                return (
                  <button
                    key={provider.name}
                    type="button"
                    onClick={() => signIn(provider.id)}
                    className={`${styles.oauth_button} ${styles[provider.name.toLowerCase()]}`}
                  >
                    Sign in with {provider.name}
                  </button>
                );
              })}
            </div>
          </Form>
        )}
      </Formik>
      {success && <div className={styles.success}>{success}</div>}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default LoginForm;

// components/SignupForm.js

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styles from '@/styles/SignupForm.module.scss';
import { useRouter } from 'next/router';

const SignupForm = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    conf_password: '',
    success: '',
    error: ''
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { name, email, password, conf_password, success, error } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerValidation = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
    conf_password: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required')
  });

  const signUpHandler = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const { data } = await axios.post('/api/auth/signup', {
        name: values.name,
        email: values.email,
        password: values.password,
      });
      setUser({ ...user, success: 'Register success! Please activate your email to start.', error: '' });
      // Redirect to profile page after successful registration and sign-in
      router.push('/');
    } catch (error) {
      setUser({ ...user, success: '', error: error.response.data.message });
    }
    setLoading(false);
    setSubmitting(false);
  };

  return (
    <div className={styles.signup_section}>
      <h1 className={styles.title}>Sign Up</h1>
      <p className={styles.subtitle}>Get access to one of the best Eshopping services in the world.</p>
      <Formik
        enableReinitialize
        initialValues={{
          name,
          email,
          password,
          conf_password
        }}
        validationSchema={registerValidation}
        onSubmit={signUpHandler}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={styles.input_container}>
              <Field
                type="text"
                name="name"
                placeholder="Full Name"
                className={styles.input}
                onChange={handleChange}
              />
              <ErrorMessage name="name" component="div" className={styles.error} />
            </div>

            <div className={styles.input_container}>
              <Field
                type="text"
                name="email"
                placeholder="Email Address"
                className={styles.input}
                onChange={handleChange}
              />
              <ErrorMessage name="email" component="div" className={styles.error} />
            </div>

            <p className={styles.info_text}>
              Enter a combination of at least six numbers, letters and punctuation marks (such as ! and &).
            </p>

            <div className={styles.input_container}>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className={styles.input}
                onChange={handleChange}
              />
              <ErrorMessage name="password" component="div" className={styles.error} />
            </div>

            <div className={styles.input_container}>
              <Field
                type="password"
                name="conf_password"
                placeholder="Re-Type Password"
                className={styles.input}
                onChange={handleChange}
              />
              <ErrorMessage name="conf_password" component="div" className={styles.error} />
            </div>

            <button type="submit" className={styles.button} disabled={loading || isSubmitting}>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </Form>
        )}
      </Formik>
      {success && <div className={styles.success}>{success}</div>}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default SignupForm;

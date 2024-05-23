import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from '@/styles/SignupForm.module.scss';

const SignupForm = () => {
  return (
    <div className={styles.signup_section}>
      <h1 className={styles.title}>Sign Up</h1>
      <p className={styles.subtitle}>Get access to one of the best Eshopping services in the world.</p>
      <Formik
        initialValues={{
          firstName: '',
          fullName: '',
          email: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().required('Required'),
          fullName: Yup.string().required('Required'),
          email: Yup.string().email('Invalid email address').required('Required'),
          password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Required')
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log('Signup Values:', values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Field type="text" name="firstName" placeholder="What's your First name?" className={styles.input} />
              <ErrorMessage name="firstName" component="div" className={styles.error} />
            </div>
            <div>
              <Field type="text" name="fullName" placeholder="Full Name" className={styles.input} />
              <ErrorMessage name="fullName" component="div" className={styles.error} />
            </div>
            <p className={styles.info_text}>You'll need this when you log in and if you ever need to reset your password.</p>
            <div>
              <Field type="email" name="email" placeholder="Email Address" className={styles.input} />
              <ErrorMessage name="email" component="div" className={styles.error} />
            </div>
            <p className={styles.info_text}>Enter a combination of at least six numbers, letters and punctuation marks(such as ! and &).</p>
            <div>
              <Field type="password" name="password" placeholder="Password" className={styles.input} />
              <ErrorMessage name="password" component="div" className={styles.error} />
            </div>
            <div>
              <Field type="password" name="confirmPassword" placeholder="Confirm your password" className={styles.input} />
              <ErrorMessage name="confirmPassword" component="div" className={styles.error} />
            </div>
            <button type="submit" disabled={isSubmitting} className={styles.button}>Sign Up</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupForm;

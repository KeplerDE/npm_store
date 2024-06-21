import styles from "../../styles/forgot.module.scss";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { BiLeftArrowAlt, BiEnvelope, BiSend } from "react-icons/bi";
import { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from 'next/link';

export default function Forgot() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const emailValidation = Yup.object({
        email: Yup.string()
            .email("Enter a valid email address.")
            .required("You'll need this when you log in and if you ever need to reset your password.")
    });

    const forgotHandler = async (values) => {
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            const response = await fetch('/api/auth/forgot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            const data = await response.json();
            if (response.ok) {
                setSuccess(data.message);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Something went wrong, please try again later.');
        }
        setLoading(false);
    };

    return (
        <>
            <Header country="" />
            <div className={styles.forgot}>
                <div className={styles.forgot__header}>
                    <BiLeftArrowAlt className={styles.backIcon} />
                    <p>Forgot your password? <Link href="/auth/signin"><span className={styles.loginInstead}>Login instead</span></Link></p>
                </div>
                <Formik
                    initialValues={{ email }}
                    validationSchema={emailValidation}
                    onSubmit={forgotHandler}
                >
                    {({ handleChange }) => (
                        <Form className={styles.form}>
                            <div className={styles.inputGroup}>
                                <BiEnvelope className={styles.icon} />
                                <Field
                                    type="text"
                                    name="email"
                                    placeholder="Email Address"
                                    onChange={(e) => {
                                        handleChange(e);
                                        setEmail(e.target.value);
                                    }}
                                    className={styles.inputField}
                                />
                                <BiSend className={styles.sendIcon} />
                            </div>
                            <button type="submit" className={styles.submitBtn} disabled={loading}>
                                {loading ? 'Sending...' : 'Sign in'} <BiSend />
                            </button>
                            <ErrorMessage name="email" component="span" className={styles.error} />
                            {error && <span className={styles.error}>{error}</span>}
                            {success && <span className={styles.success}>{success}</span>}
                        </Form>
                    )}
                </Formik>
            </div>
            <Footer country="" />
        </>
    );
}

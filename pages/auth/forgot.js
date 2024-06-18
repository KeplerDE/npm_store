import styles from "../../styles/forgot.module.scss";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { BiLeftArrowAlt, BiEnvelope, BiSend } from "react-icons/bi";
import { useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Link from 'next/link';

export default function forgot() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const emailValidation = Yup.object({
        email: Yup.string()
            .email("Enter a valid email address.")
            .required("You'll need this when you log in and if you ever need to reset your password.")
    });

    const forgotHandler = async () => {
        // Handler logic here
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
                    enableReinitialize
                    initialValues={{ email }}
                    validationSchema={emailValidation}
                    onSubmit={forgotHandler}
                >
                    {() => (
                        <Form className={styles.form}>
                            <div className={styles.inputGroup}>
                                <BiEnvelope className={styles.icon} />
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Email Address"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={styles.inputField}
                                />
                                <BiSend className={styles.sendIcon} />
                            </div>
                            <button type="submit" className={styles.submitBtn}>
                                Sign in <BiSend />
                            </button>
                            {error && <span className={styles.error}>{error}</span>}
                        </Form>
                    )}
                </Formik>
            </div>
            <Footer country="" />
        </>
    );
}

import React, { useState } from "react";
import styles from "@/styles/resetPassword.module.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BiLeftArrowAlt } from "react-icons/bi";
import LoginInput from "@/components/LoginInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import jwt from 'jsonwebtoken';
import { getSession } from "next-auth/client"; // Added import for getSession
import Router from 'next/router'; // Added import for Router
import { signIn } from 'next-auth/client'; // Added import for signIn

export default function ResetPassword({ user_id }) {
    const [password, setPassword] = useState("");
    const [conf_password, setConf_password] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    console.log("user_id:", user_id); // Checking user_id

    const passwordValidation = Yup.object({
        password: Yup.string()
            .required("Enter a combination of at least six numbers, letters, and punctuation marks (such as ! and &).")
            .min(6, "Password must be at least 6 characters.")
            .max(36, "Password can't be more than 36 characters"),
        conf_password: Yup.string()
            .required("Confirm your password.")
            .oneOf([Yup.ref("password")], "Passwords must match."),
    });

    const resetHandler = async () => {
        try {
            setLoading(true);
            setError("");
            const { data } = await axios.put("/api/auth/reset", {
                user_id,
                password,
            });

            let options = {
                redirect: false,
                email: data.email,
                password: password,
            };

            await signIn("credentials", options);
            window.location.reload(true);
            setLoading(false);
            Router.push("/");
            setSuccess("Password reset successful!");
        } catch (error) {
            setLoading(false);
            setSuccess("");
            setError(error.response.data.message);
        }
    };

    return (
        <>
            {loading && <ClipLoader loading={loading} />}
            <Header country="" />
            <div className={styles.resetPasswordContainer}>
                <div className={styles.resetPasswordHeader}>
                    <div className={styles.backSvg}>
                        <BiLeftArrowAlt />
                    </div>
                    <span className={styles.text}>
                        Reset your password? <Link href="/" className={styles.link}>Login instead</Link>
                    </span>
                </div>
                <Formik
                    enableReinitialize
                    initialValues={{
                        password,
                        conf_password,
                    }}
                    validationSchema={passwordValidation}
                    onSubmit={() => {
                        resetHandler();
                    }}
                >
                    {() => (
                        <Form>
                            <LoginInput
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <LoginInput
                                type="password"
                                name="conf_password"
                                placeholder="Confirm Password"
                                onChange={(e) => setConf_password(e.target.value)}
                            />
                            <button type="submit" className={styles.button}>Change password</button>
                            <div style={{ marginTop: "10px" }}>
                                {error && <span className={styles.error}>{error}</span>}
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <Footer country="" />
        </>
    );
}

export async function getServerSideProps(context) {
    const { query, req } = context;
    const session = await getSession({ req });
    if (session) {
        return {
            redirect: {
                destination: "/",
            },
        };
    }
    const token = query.token;
    console.log("token", token);

    const user_id = jwt.verify(token, process.env.RESET_TOKEN_SECRET);
    return {
        props: {
            user_id: user_id.id, // assuming user_id contains an id property
        },
    };
}

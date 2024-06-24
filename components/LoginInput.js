import React from 'react';
import styles from '@/styles/LoginInput.module.scss';

const LoginInput = ({ type, name, placeholder, onChange }) => {
    return (
        <div className={styles.inputGroup}>
            <input 
                type={type} 
                name={name} 
                placeholder={placeholder} 
                onChange={onChange} 
                className={styles.input}
            />
        </div>
    );
};

export default LoginInput;

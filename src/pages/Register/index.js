import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "../../firebaseConnection";
import styles from '../Home/home.module.css';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();

        if (email !== '' && password !== '') {
            await createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    navigate('/admin', { replace: true })
                }).catch(() => alert("Erro ao fazer o cadastro!"))
        } else {
            alert("Preencha todos os campos");
        }
    }

    return (
        <div className={styles.container}>
            <h1>Cadastre-se</h1>
            <span>Vamos criar sua conta</span>

            <form className={styles.form} onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder='Digite seu email...'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <input
                    type="password"
                    placeholder='**********'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete={false.toString()} />

                <button type='submit'>Cadastrar</button>
            </form>

            <Link to={'/'} className={styles.btnLink}>Já possui uma conta? Faça login!</Link>
        </div>
    )
}

export default Register
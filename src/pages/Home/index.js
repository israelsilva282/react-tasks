import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './home.module.css';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../firebaseConnection";

function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        if (email !== '' && password !== '') {
            await signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    navigate("/admin", { replace: true });
                })
                .catch(() => alert("Email ou senha incorretos"))
        } else {
            alert("Preencha todos os campos")
        }
    }

    return (
        <div className={styles.container}>
            <h1>Lista de tarefas</h1>
            <span>Gerencia sua agenda de forma fácil</span>

            <form className={styles.form} onSubmit={handleLogin}>
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

                <button type='submit'>Acessar</button>
            </form>

            <Link to={'/register'} className={styles.btnLink}>Não possui uma conta? Cadastre-se!</Link>
        </div>
    )
}

export default Home
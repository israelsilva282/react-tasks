import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css';

function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin(e) {
        e.preventDefault();

        if (email !== '' && password !== '') {

        } else {
            alert("Preencha todos os campos")
        }
    }

    return (
        <div className='home-container'>
            <h1>Lista de tarefas</h1>
            <span>Gerencia sua agenda de forma fácil</span>

            <form className='form' onSubmit={handleLogin}>
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
                    autoComplete={false} />

                <button type='submit'>Acessar</button>
            </form>

            <Link to={'/register'} className='btn-link'>Não possui uma conta? Cadastre-se</Link>
        </div>
    )
}

export default Home
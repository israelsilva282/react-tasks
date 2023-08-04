import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from "../../firebaseConnection";
import styles from "./admin.module.css";

function Admin() {
    const [tarefasInput, setTarefasInput] = useState("");

    async function handleLogout() {
        await signOut(auth);
    }
    return (
        <div className={styles.container}>
            <h1>Minhas tarefas</h1>

            <form className={styles.form}>
                <textarea
                    placeholder='Digite sua tarefa...'
                    value={tarefasInput}
                    onChange={(e) => setTarefasInput(e.target.value)} />

                <button className={styles.btnRegister}>Registrar tarefa</button>
            </form>

            <article className={styles.list}>
                <p>Estudar Javascript e React hoje a noite!</p>
                <div>
                    <button>Editar</button>
                    <button className={styles.btnDelete}>Concluir</button>
                </div>
            </article>

            <button className={styles.btnLogout} onClick={handleLogout}>Sair</button>
        </div>
    )
}

export default Admin
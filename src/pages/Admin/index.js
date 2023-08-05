import { useEffect, useState } from 'react'
import styles from './admin.module.css'

import { signOut } from 'firebase/auth'
import { auth, db } from '../../firebaseConnection'

import {
    addDoc,
    collection,
    onSnapshot,
    orderBy,
    query,
    where
} from 'firebase/firestore'

export default function Admin() {
    const [tarefaInput, setTarefaInput] = useState('')
    const [user, setUser] = useState({})
    const [tarefas, setTarefas] = useState([])

    useEffect(() => {
        async function loadTarefas() {
            const userDetail = localStorage.getItem("@detailUser")
            setUser(JSON.parse(userDetail))

            if (userDetail) {
                const data = JSON.parse(userDetail)
                const tarefaRef = collection(db, "tarefas")
                const q = query(tarefaRef, orderBy("created", "desc"), where("userUid", "==", data?.uid))
                const unsub = onSnapshot(q, (snapshot) => {
                    let lista = [];

                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            tarefa: doc.data().tarefa,
                            userUid: doc.data().userUid,
                        })
                    })
                    console.log(lista)
                    setTarefas(lista)
                })
            }
        }

        loadTarefas();
    }, [])

    async function handleRegister(e) {
        e.preventDefault();

        if (tarefaInput === '') {
            alert("Digite sua tarefa...")
            return;
        }

        await addDoc(collection(db, "tarefas"), {
            tarefa: tarefaInput,
            created: new Date(),
            userUid: user?.uid
        })
            .then(() => {
                console.log("TAREFA REGISTRADA")
                setTarefaInput('')
            })
            .catch((error) => {
                console.log("ERRO AO REGISTRAR " + error)
            })


    }

    async function handleLogout() {
        await signOut(auth);
    }

    return (
        <div className={styles.container}>
            <h1>Minhas tarefas</h1>

            <form className={styles.form} onSubmit={handleRegister}>
                <textarea
                    placeholder="Digite sua tarefa..."
                    value={tarefaInput}
                    onChange={(e) => setTarefaInput(e.target.value)}
                />

                <button className={styles.btnRegister} type="submit">Registrar tarefa</button>
            </form>

            <article className={styles.list}>
                <p>Estudar javascript e reactjs hoje a noite</p>

                <div>
                    <button>Editar</button>
                    <button className={styles.btnDelete}>Concluir</button>
                </div>
            </article>


            <button className={styles.btnLogout} onClick={handleLogout}>Sair</button>

        </div>
    )
}
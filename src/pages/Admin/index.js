import { useEffect, useState } from 'react'
import styles from './admin.module.css'

import { signOut } from 'firebase/auth'
import { auth, db } from '../../firebaseConnection'

import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    updateDoc,
    where
} from 'firebase/firestore'

export default function Admin() {
    const [tarefaInput, setTarefaInput] = useState('')
    const [user, setUser] = useState({})
    const [tarefas, setTarefas] = useState([])
    const [editTarefa, setEditTarefa] = useState([])

    useEffect(() => {
        async function loadTarefas() {
            const userDetail = localStorage.getItem("@detailUser")
            setUser(JSON.parse(userDetail))

            if (userDetail) {
                const data = JSON.parse(userDetail)
                const tarefaRef = collection(db, "tarefas")
                const q = query(tarefaRef, orderBy("created", "desc"), where("userUid", "==", data?.uid))
                onSnapshot(q, (snapshot) => {
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

        if (editTarefa?.id) {
            handleUpdateTarefa();
            return
        }

        await addDoc(collection(db, "tarefas"), {
            tarefa: tarefaInput,
            created: new Date(),
            userUid: user?.uid
        })
            .then(() => {
                setTarefaInput('')
            })
            .catch((error) => {
                console.log("ERRO AO REGISTRAR " + error)
            })


    }

    async function handleLogout() {
        await signOut(auth);
    }

    async function handleDelete(id) {
        const docRef = doc(db, "tarefas", id)
        await deleteDoc(docRef)
    }

    async function handleEdit(item) {
        setTarefaInput(item.tarefa)
        setEditTarefa(item)
    }

    async function handleUpdateTarefa() {
        const docRef = doc(db, "tarefas", editTarefa?.id)
        await updateDoc(docRef, {
            tarefa: tarefaInput,
        })
            .then(() => {
                setTarefaInput('')
                setEditTarefa('')
            })
            .catch(() => {
                alert("ERRO AO ATUALIZAR")
                setTarefaInput('')
                setEditTarefa('')
            })
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

                {Object.keys(editTarefa).length > 0 ? (
                    <button
                        className={styles.btnRegister} type="submit"
                        style={{ backgroundColor: '#6add39' }}>Atualizar tarefa</button>
                ) : (
                    <button className={styles.btnRegister} type="submit">Registrar tarefa</button>
                )}
            </form>

            {tarefas.map((item) => (
                <article className={styles.list} key={item.id}>
                    <p>{item.tarefa}</p>

                    <div>
                        <button className={styles.btnEdit} onClick={() => handleEdit(item)}>Editar</button>
                        <button className={styles.btnDelete} onClick={() => handleDelete(item.id)}>Concluir</button>
                    </div>
                </article>
            ))}


            <button className={styles.btnLogout} onClick={handleLogout}>Sair</button>

        </div>
    )
}
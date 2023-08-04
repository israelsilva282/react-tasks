import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from '../firebaseConnection';

export default function Private({ children }) {
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(() => {
        async function checkLogin() {
            const unsub = onAuthStateChanged(auth, (user) => {
                if (user) {
                    const userData = {
                        uid: user.uid,
                        email: user.email,
                    };

                    localStorage.setItem("@detailUser", JSON.stringify(userData));

                    setLoading(false);
                    setSigned(true);
                } else {
                    setLoading(false);
                    setSigned(false);
                }
            })
        }
    }, [])

    if (!signed) {
        return <Navigate to={'/'} />
    }

    if (loading) {
        return (<div></div>)
    }

    return children;
}
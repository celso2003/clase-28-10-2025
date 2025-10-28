import { Fragment, useEffect, useState } from "react";
import { db } from "../firebaseConfig.js";
import { collection, onSnapshot, addDoc } from "firebase/firestore"; // <-- CORREGIDO

export function Usuario() {
    const [usuarios, setUsuarios] = useState([]);
    const [nuevoUsuario, setNuevoUsuario] = useState(""); // <-- CORREGIDO

    useEffect(() => {
        const usuariosRef = collection(db, "usuarios");
        
        // "unsubscribe" y "snapshot" corregidos
        const unsubscribe = onSnapshot(usuariosRef, (snapshot) => { 
            const lista = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUsuarios(lista);
        });

        return () => unsubscribe(); // <-- CORREGIDO
    }, []);

    const agregarUsuario = async () => {
        if (nuevoUsuario.trim() === "") return;
        
        await addDoc(collection(db, "usuarios"), { nombre: nuevoUsuario });
        setNuevoUsuario(""); // <-- Esto ahora funciona
        alert("Usuario agregado con éxito");
    }

   return(
        <Fragment>
            <div className="container">
                <h1 style={{textAlign: "center"}}>Lista de usuarios</h1>
                <hr/>
                <div className="input-group">
                    <input
                        value={nuevoUsuario}
                        onChange={e => setNuevoUsuario(e.target.value)}
                        className="form-control"
                        type="text"
                        placeholder="Ingrese nombre del usuario"></input>
                    <button onClick={agregarUsuario} className="btn btn-success"><i class="bi bi-capslock"></i></button>
                </div>
                <ul className="list-group mt-2">
                    {usuarios.map((usuario) => (
                        <li key={usuario.id} className="list-group-item">{usuario.nombre}</li>
                    ))}
                </ul>
            </div>
        </Fragment>
    )
}
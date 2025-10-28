import React, { Fragment } from 'react';
import { db } from '../firebaseConfig.js';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';

import { useEffect, useState } from 'react';

export function Usuario() {
    const [usuarios, setUsuarios] = useState([]);
    const [nuevoUsuario, setNuevoUsuario] = useState("");

    useEffect(() => {
        const usuariosRef = collection(db, "usuarios");
        const unsubscribe = onSnapshot(usuariosRef, (snapshot) => {
            const lista = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUsuarios(lista);
        })
    });

    const agregarUsuario = async () => {
        if (nuevoUsuario.trim() === "") return;
        await addDoc(collection(db, "usuarios"), { nombre: nuevoUsuario });
        setNuevoUsuario("");
        alert("Usuario agregado con éxito");
    }

    return (
        <Fragment>
            <div className="container">
                <h1 style={{ textAlign: "center" }}>Lista de Usuarios</h1>

                <hr />

                <div className="input-group">
                    <input
                        value = {nuevoUsuario}
                        onChange={e => setNuevoUsuario(e.target.value)}
                        className="form-control"
                        type="text"
                        placeholder="Ingrese el nombre del juego"></input>
                    <button onClick={agregarUsuario} className="btn btn-success">+</button>
                </div>

                <ul className="list-group mt-2">
                    {usuarios.map((usuario) => (
                        <li key={usuario.id}>{usuario.nombre}</li>
                    ))}
                </ul>
            </div>
        </Fragment>
    );
}
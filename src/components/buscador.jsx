import React from "react";

const Buscador = ({onClick, onChange}) =>{  // componente que devuelve un input con un evento asignado y un botón con otro evento
    return (
        <div>
            <input onChange={onChange} type="text" placeholder="Buscar"/>
            <button onClick={onClick}>Buscar</button>
        </div>
    );
}

export default Buscador;
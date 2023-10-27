import React from "react";
import './buscador.css'
const Buscador = ({onClick, onChange}) =>{  // componente que devuelve un input con un evento asignado y un botón con otro evento
    return (
        <div>
            <input class="input_filter" onChange={onChange} type="text" placeholder="Buscar..."/>
            <button class= "button_search" onClick={onClick}>Buscar</button>
        </div>
    );
}

export default Buscador;
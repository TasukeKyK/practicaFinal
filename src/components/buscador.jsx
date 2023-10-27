import React from "react";

const Buscador = ({onClick, onChange}) =>{
    return (
        <div>
            <input onChange={onChange} type="text" placeholder="Buscar"/>
            <button onClick={onClick}>Buscar</button>
        </div>
    );
}

export default Buscador;
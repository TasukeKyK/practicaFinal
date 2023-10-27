import React from "react";
import "./tabla.css";
const Tabla = ({ users }) => {  // recibe los usuarios que va a mostrar
  const renderList = () => {  // renderiza los usuarios 
    return users.map((user) => {  // accede a cada uno de ellos y a sus propiedades
      return (
        <tr key={user.name.first+user.name.last+user.email+user.dob.age}>
          <th key={user.name.first+user.name.last}>{user.name.first}</th>
          <th key={user.name.first+user.name.last+user.name.last}>{user.name.last}</th>
          <th key={user.name.first+user.name.last+user.email}>{user.email}</th>
          <th key={user.name.first+user.name.last+user.dob.age}>{user.dob.age}</th>
        </tr>
      );
    });
  };
  return (
    <table>
      <thead>
        <tr>
          <th>
            <strong>Nombre</strong>
          </th>
          <th>
            <strong>Apellido</strong>
          </th>
          <th>
            <strong>Correo</strong>
          </th>
          <th>
            <strong>Edad</strong>
          </th>
        </tr>
      </thead>
      <tbody>{renderList()}</tbody>
    </table>
  );
};

export default Tabla;

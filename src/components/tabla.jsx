import React from "react";
import "./tabla.css";
const Tabla = ({ users }) => {
  const renderList = () => {
    return users.map((user) => {
      return (
        <tr>
          <th>{user.name.first}</th>
          <th>{user.name.last}</th>
          <th>{user.email}</th>
          <th>{user.dob.age}</th>
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

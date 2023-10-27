import React, { useState, useContext } from "react";
import { getListService } from "../services/getlist.service";

// se crea el contexto con su nombre
const userListContext = React.createContext();

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  // función que devuelve un listado mediante un fetch


  return (
    // se declara el contexto.Provider y se le pasan los valores que queramos darle
    <userListContext.Provider value={{ users }}>
      {children}
    </userListContext.Provider>
  );
};

export default UserProvider;
// se exporta la funcion para usar el context
export function useListProviderContext() {
  return useContext(userListContext);
}

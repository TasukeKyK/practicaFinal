import { useState, useEffect } from "react";
import "./App.css";
import Tabla from "./components/tabla";
import UserProvider from "./providers/userListProvider";
import { getListService } from "./services/getlist.service";

function App() {
  const [users, setUsers] = useState(null); // Estado para almacenar los datos
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    setTimeout(() => {
      // Verifica si la solicitud ya se ha realizado
      if (!users) {
        getListService()
          .then((data) => {
            setUsers(data);
            console.log(data);
          })
          .catch(() => console.error("Ha ocurrido un error"))
          .finally(() => {
            setIsLoading(false); // Marca la solicitud como completa
          });
      }
    }, 2000);
  }, []); // La dependencia data asegura que esta solicitud se realice solo una vez
  
  if (isLoading) {
    return <p>Cargando...</p>;
  } else {
    return (
      <>
        <UserProvider>
          <Tabla users={users} />
        </UserProvider>
      </>
    );
  }
}

export default App;

import { useState, useEffect } from "react";
import "./App.css";
import Tabla from "./components/tabla";
import UserProvider from "./providers/userListProvider";
import { getListService } from "./services/getlist.service";
import Buscador from "./components/buscador";

function App() {
  const [users, setUsers] = useState(null); // Estado para almacenar los datos
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga
  const [inputValue, setInputValue] = useState(""); // Estado para manejar el input

  useEffect(() => {
    setTimeout(() => {
      // Verifica si la solicitud ya se ha realizado
      if (!users) {
        getListService()
          .then((data) => {
            setUsers(data);
            setUsersTemplate(data);
            console.log(data);
          })
          .catch(() => console.error("Ha ocurrido un error"))
          .finally(() => {
            setIsLoading(false); // Marca la solicitud como completa
          });
      }
    }, 2000);
  }, []); // La dependencia data asegura que esta solicitud se realice solo una vez

const [usersTemplate,setUsersTemplate] = useState("");

  const handleChange = (event) =>{
    setInputValue(event.target.value);
  }

  const onClick = () => {
    const filter = inputValue.toLowerCase();
    const newUsers = users.filter((user) => {
      const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
      return (
        fullName.includes(filter) ||
        user.email.toLowerCase().includes(filter)
      );
    });
    setUsersTemplate(newUsers);
  };

  if (isLoading) {
    return <p>Cargando...</p>;
  } else {
    return (
      <>
        <UserProvider>
          <Buscador onClick={onClick} onChange={handleChange}/>
          <Tabla users={usersTemplate} />
        </UserProvider>
      </>
    );
  }
}

export default App;

import { useState, useEffect, useContext } from "react";
import "./App.css";
import Tabla from "./components/tabla";
import ThemeContext, { themes } from "./providers/themeProvider";
import { getListService } from "./services/getlist.service";
import Buscador from "./components/buscador";

function App() {
  const [users, setUsers] = useState(null); // Estado para almacenar los datos
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga
  const [inputValue, setInputValue] = useState(""); // Estado para manejar el input
  const [currentTheme, setCurrentTheme] = useState(themes.light); // Estado del theme actual
  const [appStyle, setAppStyle] = useState({
    // estilo del div superior
    backgoundColor: currentTheme.background,
    color: currentTheme.color,
  });

  // hook que se utiliza cada vez que se refresca
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

  const [usersTemplate, setUsersTemplate] = useState(""); // variable que almacena los usuarios que se van a mostrar en la lista

  const handleChange = (event) => {
    // cada vez que se escriba en el input va a guardarse el valor
    setInputValue(event.target.value);
  };

  const onClick = () => {
    // al hacer click en el botón buscar filtra los resultados comprobando nombre, apellido y email
    const filter = inputValue.toLowerCase();
    const newUsers = users.filter((user) => {
      const fullName = `${user.name.first} ${user.name.last}`.toLowerCase(); // se hace el nombre completo para no tener que utilizar 3 variables
      return (
        fullName.includes(filter) || user.email.toLowerCase().includes(filter) // si el filtro está dentro del nombre(completo) o del email se guarda
      );
    });
    setUsersTemplate(newUsers);
  };

  const switchThemes = (event) => {
    // permite cambiar de tema esté o no esté pulsado el botón
    if (event.target.checked) {
      setCurrentTheme(themes.dark);
    } else {
      setCurrentTheme(themes.light);
    }

    setAppStyle({
      backgoundColor: currentTheme.background,
      color: currentTheme.color,
    });
  };

  if (isLoading) {
    // mientras devuelven los datos de la api se muestra esto
    return <p>Cargando...</p>;
  } else {
    return (
      // cuando ya han sido devueltos se renderizan los componentes
      <>
        <div style={appStyle}>
          <ThemeContext.Provider
            value={{ theme: currentTheme, updateTheme: setCurrentTheme }}
          >
            <h1>App bootcamp</h1>
            <input type="checkbox" onChange={switchThemes} />
            <label>Cambiar a modo oscuro</label>
            <Buscador onClick={onClick} onChange={handleChange} />
            <Tabla users={usersTemplate} />
          </ThemeContext.Provider>
        </div>
      </>
    );
  }
}

export default App;

import { useState, useContext } from "react";
import "./App.css";
import Tabla from "./components/tabla";
import ThemeContext, { themes } from "./providers/themeProvider";
import Buscador from "./components/buscador";
import { usePracticaFList } from "./hooks/usePracticaFList";
function App() {
  const [users, isLoading] = usePracticaFList();

  const [inputValue, setInputValue] = useState(""); // Estado para manejar el input
  const [currentTheme, setCurrentTheme] = useState(themes.light); // Estado del theme actual
  const [appStyle, setAppStyle] = useState({
    // estilo del div superior
    backgroundColor: currentTheme.background,
    color: currentTheme.color,
  });

  const [usersTemplate, setUsersTemplate] = useState(users); // variable que almacena los usuarios que se van a mostrar en la lista

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
      backgroundColor: currentTheme.background,
      color: currentTheme.color,
    });
  };
  const justOlders50 = (e) => {
    if (e.target.checked) {
      const filter = 50;
      const newUsers = users.filter((user) => {
        const fullName = `${user.name.first} ${user.name.last}`.toLowerCase(); // se hace el nombre completo para no tener que utilizar 3 variables
        return user.dob.age >= 50;
      });
      setUsersTemplate(newUsers);
    } else {
      setUsersTemplate(users)
    }
  };

  if (isLoading) {
    // mientras devuelven los datos de la api se muestra esto
    return <p>Cargando...</p>;
  } else if (!usersTemplate) {
    setUsersTemplate(users);
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
            <br/>
            <input type="checkbox" onChange={justOlders50} />
            <label>Mostrar usuarios mayores de 50</label>
            <Buscador onClick={onClick} onChange={handleChange} />
            <Tabla users={usersTemplate} />
          </ThemeContext.Provider>
        </div>
      </>
    );
  }
}

export default App;

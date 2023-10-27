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
  const [currentTheme, setCurrentTheme] = useState(themes.light);
  const [appStyle, setAppStyle] = useState({
    backgoundColor : currentTheme.background,
    color: currentTheme.color
  });

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

  const [usersTemplate, setUsersTemplate] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const onClick = () => {
    const filter = inputValue.toLowerCase();
    const newUsers = users.filter((user) => {
      const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
      return (
        fullName.includes(filter) || user.email.toLowerCase().includes(filter)
      );
    });
    setUsersTemplate(newUsers);
  };

  const switchThemes = (event) => {
    if(event.target.checked){
      setCurrentTheme(themes.dark)
      
    } else {
      setCurrentTheme(themes.light)
      
    }
    const styles = {
      backgoundColor : currentTheme.background,
      color: currentTheme.color
    }
    setAppStyle(styles)
    console.log(styles)
  }

  if (isLoading) {
    return <p>Cargando...</p>;
  } else {
    return (
      <>
        <div style={appStyle}>
          <ThemeContext.Provider value={{ theme: currentTheme, updateTheme: setCurrentTheme }}>
            <h1>App bootcamp</h1>
            <input type="checkbox" onChange={switchThemes}/>
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

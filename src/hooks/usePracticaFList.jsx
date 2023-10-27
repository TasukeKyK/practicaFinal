import React from "react";
import { getListService } from "../services/getlist.service";

export const usePracticaFList = () => {
  const [users, setUsers] = React.useState(null); // Estado para almacenar los datos
  const [isLoading, setIsLoading] = React.useState(true); // Estado para manejar la carga
 // hook que se utiliza cada vez que se refresca
 React.useEffect(() => {
    setTimeout(() => {
      // Verifica si la solicitud ya se ha realizado
      if (!users) {
        getListService()
          .then((data) => {
            setUsers(data);
          })
          .catch((error) => console.error("Ha ocurrido un error:",error))
          .finally(() => {
            setIsLoading(false); // Marca la solicitud como completa
          });
      }
    }, 2000);
  }, []); // La dependencia data asegura que esta solicitud se realice solo una vez


  return [users, isLoading];
};

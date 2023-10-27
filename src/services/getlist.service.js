// sirve como servicio para dar los resultados devueltos de la api
export const getListService  = () =>
  fetch('https://randomuser.me/api/?results=100')
    .then((response) => response.json())
    .then(({ results }) => results)
    .catch(() => {
      throw new Error();
    });

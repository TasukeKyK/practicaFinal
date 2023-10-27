export const getListService  = () =>
  fetch('https://randomuser.me/api/?results=100')
    .then((response) => response.json())
    .then(({ results }) => results)
    .catch(() => {
      throw new Error();
    });

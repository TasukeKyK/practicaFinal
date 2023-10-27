import React from "react";

export const themes = {
  //exporta los dos temas que hay
  light: {
    color: "black",
    background: "#eeeeee",
  },
  dark: {
    color: "#eeeeee",
    background: "#222222",
  },
};

const ThemeContext = React.createContext({
  theme: themes.light,
  updateTheme: () => {},
});

export default ThemeContext;

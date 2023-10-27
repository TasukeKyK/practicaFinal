
import React from 'react'
export const themes = {
    light: {
      color: "#555555",
      background: "#eeeeee"
    },
    dark: {
      color: "#eeeeee",
      background: "#222222"
    }
  };
  
const ThemeContext = React.createContext({
    theme: themes.light,
    updateTheme: () => {}
  });

  export default ThemeContext;
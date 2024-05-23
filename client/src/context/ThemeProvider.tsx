import React from "react";
import useTheme from "../hooks/useTheme";

export const ThemeContext = React.createContext(null);

const ThemeProvider = ({ children }) => {
  const { theme, setTheme } = useTheme();

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;

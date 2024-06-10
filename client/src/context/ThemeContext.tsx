import React from "react";
import { useToggleTheme } from "../hooks";

interface ThemeContext {
  theme: "dark" | "light";
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

export const ThemeContext = React.createContext<ThemeContext | null>(null);

interface ThemeProviderChildren {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderChildren> = ({ children }) => {
  const { theme, setTheme } = useToggleTheme();

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;

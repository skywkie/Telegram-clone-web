import React from "react";

//default windows theme
const isLight = window?.matchMedia("(prefers-color-scheme: light)").matches;
const userDefaultTheme = isLight ? "light" : "dark";

interface ThemeState {
  theme: "dark" | "light";
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const useToggleTheme = () => {
  const [theme, setTheme] = React.useState(
    localStorage.getItem("data-theme") || userDefaultTheme,
  );

  React.useLayoutEffect(() => {
    localStorage.setItem("data-theme", theme);
    document.documentElement.className = theme;
  }, [theme]);

  return { theme, setTheme } as ThemeState;
};

export default useToggleTheme;

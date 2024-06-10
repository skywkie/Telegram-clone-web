import React from "react";

//default windows theme
const isLight = window?.matchMedia("(prefers-color-scheme: light)").matches;
const userDefaultTheme = isLight ? "light" : "dark";

interface ThemeState {
  theme: "dark" | "light";
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

export default function useToggleTheme() {
  const [theme, setTheme] = React.useState(
    localStorage.getItem("data-theme") || userDefaultTheme
  );

  React.useEffect(() => {
    localStorage.setItem("data-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return { theme, setTheme } as ThemeState;
}

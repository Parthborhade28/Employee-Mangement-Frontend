import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import getTheme from "./theme";

const ThemeContext = createContext(null);

export function ThemeModeProvider({ children }) {

  const [mode, setMode] = useState(() => {
    const savedMode =
      localStorage.getItem("themeMode");

    return savedMode || "light";
  });

  const toggleTheme = () => {

    setMode((currentMode) => {

      const newMode =
        currentMode === "light"
          ? "dark"
          : "light";

      localStorage.setItem(
        "themeMode",
        newMode
      );

      return newMode;
    });
  };

  const theme = useMemo(
    () => getTheme(mode),
    [mode]
  );

  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggleTheme,
      }}
    >
      {children(theme)}
    </ThemeContext.Provider>
  );
}

export function useThemeMode() {
  return useContext(ThemeContext);
}
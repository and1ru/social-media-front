import { useState, type ReactNode } from "react";
import { ThemeContext } from "./ThemeContext";

interface Props {
    children:ReactNode
}

export const ThemeProvider = ({children}:Props) => {
    const [theme, setTheme] = useState(false)
  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
        {children}
    </ThemeContext.Provider>
  );
};

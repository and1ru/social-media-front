import { createContext, useContext } from "react";

interface ThemeP{
    theme: boolean;
    setTheme: React.Dispatch<React.SetStateAction<boolean>>
}

export const ThemeContext = createContext<ThemeP>({
    theme:false,
    setTheme:() => {}
})

export const useThemContext = () => {
    const context = useContext(ThemeContext)

    return context
}
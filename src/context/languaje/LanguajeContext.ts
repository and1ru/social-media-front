import { createContext, useContext } from "react";

interface LanguajeP{
    languaje:string;
    setLanguaje: React.Dispatch<React.SetStateAction<string>>
}

export const LanguajeContext = createContext<LanguajeP>({
    languaje:"en",
    setLanguaje:() => {}
})

export const useLanguajeContext = () => {
    const context = useContext(LanguajeContext)

    return context
}
import { useState, type ReactNode } from "react";
import { LanguajeContext } from "./LanguajeContext";

interface Props {
    children:ReactNode
}

export const LanguajeProvider = ({children}:Props) => {
    const [languaje, setLanguaje] = useState("en")
  return (
    <LanguajeContext.Provider value={{languaje, setLanguaje}}>
        {children}
    </LanguajeContext.Provider>
  );
};

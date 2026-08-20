import { createContext, useContext } from "react";

interface AuthI{
    id:string;
    name:string
}

interface AuthContextI{
    auth: AuthI
    setAuth: React.Dispatch<React.SetStateAction<AuthI>>
}

export const AuthContext = createContext<null | AuthContextI>(null)

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("can't use the context out the provider")
    }

    return context
}
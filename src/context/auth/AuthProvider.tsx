import { useState, type ReactNode } from "react"
import { AuthContext } from "./AuthContext"

interface AuthI{
    id:string;
    name:string
}

interface Props {
    children: ReactNode
}

export const AuthProvider = ({children}: Props) => {
    const [auth, setAuth] = useState<AuthI>({id:"", name:""})
    return(
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}
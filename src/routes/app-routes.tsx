import { createBrowserRouter } from "react-router-dom";
import { RegisterPage } from "../page/register-page";
import { LoginPage } from "../page/login-page";

export const routes = createBrowserRouter([
    {
        path: "",
        element: <h1>hola</h1>
    },
    {
        path: "register",
        element: <RegisterPage/>
    },
    {
        path: "login",
        element: <LoginPage/>
    }
])
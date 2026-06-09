import { createBrowserRouter } from "react-router-dom";
import { RegisterPage } from "../page/register-page";
import { LoginPage } from "../page/login-page";
import { RootPage } from "../page/root-page";
import { ChatsPage } from "../page/chats-page";
import { SocialPage } from "../page/social-page";
import { FriendsPage } from "../page/friends-page";
import { ChatPage } from "../page/chat-page";

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
    },
    {
        path: "/private/",
        element: <RootPage/>,
        children: [
            {
               path: "chats",
               element: <ChatsPage/> 
            },
            {
                path: "social",
                element: <SocialPage/>
            },
            {
                path: "friends",
                element: <FriendsPage/>
            },
            {
                path: "chat",
                element: <ChatPage/>
            }
        ]
    }
])
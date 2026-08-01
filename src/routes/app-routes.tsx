import { createBrowserRouter } from "react-router-dom";
import { RegisterPage } from "../pages/Register/Register";
import { LoginPage } from "../pages/Login/Login";
import { RootPage } from "../pages/Root";
import { ChatsPage } from "../pages/Chats/Chats";
import { SocialPage } from "../pages/Social/Social";
import { FriendsPage } from "../pages/Friends/Friends";
import { ChatPage } from "../pages/Chat/Chat";
import { UsersPage } from "../pages/Users/Users";
import { HomePage } from "../pages/Home/Home";
import { UserPage } from "../pages/User/User";
import { PostPage } from "../pages/Post/Post";

export const routes = createBrowserRouter([
    {
        path: "",
        element: <HomePage/>
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
                path: "chat/:id",
                element: <ChatPage/>
            },
            {
                path: "users",
                element: <UsersPage/>
            },
            {
                path: "user/:id",
                element: <UserPage/>
            },
            {
                path: "post/:id",
                element: <PostPage/>
            }
        ]
    }
])
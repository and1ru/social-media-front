import { createBrowserRouter } from "react-router-dom";
import { RegisterPage } from "../pages/Register/Register";
import { LoginPage } from "../pages/Login/Login";
import { ChatsPage } from "../pages/Chats/Chats";
import { SocialPage } from "../pages/Social/Social";
import { FriendsPage } from "../pages/Friends/Friends";
import { UsersPage } from "../pages/Users/Users";
import { HomePage } from "../pages/Home/Home";
import { UserPage } from "../pages/User/User";
import { PostPage } from "../pages/Post/Post";
import { RootPage } from "../pages/Root/Root";
import { NotFound } from "../pages/NotFound/NotFound";
import { Chat } from "../pages/Chat/Chat";
import { SomethingWentWrong } from "../pages/SomethignWentWront/SomethignWentWront";

export const routes = createBrowserRouter([
    {
        path: "",
        element: <HomePage />
    },
    {
        path: "register",
        element: <RegisterPage />
    },
    {
        path: "login",
        element: <LoginPage />
    },
    {
        path: "/private/",
        element: <RootPage />,
        children: [
            {
                path: "chats",
                element: <ChatsPage />
            },
            {
                path: "social",
                element: <SocialPage />
            },
            {
                path: "friends",
                element: <FriendsPage />
            },
            {
                path: "chat/:id",
                element: <Chat />
            },
            {
                path: "users",
                element: <UsersPage />
            },
            {
                path: "user/:id",
                element: <UserPage />
            },
            {
                path: "post/:id",
                element: <PostPage />
            },
            {
                path: "error",
                element: <SomethingWentWrong />
            }
        ],
    },
    {
        path: "*",
        element: <NotFound />
    }
])
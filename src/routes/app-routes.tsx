import { createBrowserRouter } from "react-router-dom";
import { RegisterPage } from "../page/register-page/register-page";
import { LoginPage } from "../page/login-page/login-page";
import { RootPage } from "../page/root-page";
import { ChatsPage } from "../page/chats-page/chats-page";
import { SocialPage } from "../page/social-page/social-page";
import { FriendsPage } from "../page/friends-page/friends-page";
import { ChatPage } from "../page/chat-page/chat-page";
import { UsersPage } from "../page/users-page/users-page";
import { HomePage } from "../page/home-page/home-page";
import { UserPage } from "../page/user-page/user-page";
import { PostPage } from "../page/post-page/post-page";

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
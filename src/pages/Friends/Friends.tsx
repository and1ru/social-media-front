import { FindUserForm } from "../../components/FindUsersForm/FindUsersForm";
import { FriendRequests } from "../../components/FriendRequests/FriendRequests";
import { Header } from "../../components/Header/Header";
import { useLanguajeContext } from "../../context/languaje/LanguajeContext";
import { es, en } from '../../laguaje'

export const FriendsPage = () => {
    const { languaje } = useLanguajeContext()

    return (
        <>
            <Header />
            <main className="min-h-[calc(100vh-64px)] bg-gray-50 py-8 px-4 dark:bg-gray-700 transition duration-400 ease-in-out">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {languaje === "en" ? en.headerFriends : es.headerFriends}
                </h1>
                <FindUserForm />
                <FriendRequests />
            </main>
        </>
    );
};
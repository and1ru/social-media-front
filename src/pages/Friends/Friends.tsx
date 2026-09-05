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
            <main className="min-h-screen bg-gray-50 py-8 px-50 dark:bg-gray-700 transition duration-400 ease-in-out">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-10">
                    {languaje === "en" ? en.headerFriends : es.headerFriends}
                </h1>
                <section className="w-full mx-auto flex flex-col gap-5">
                    <FindUserForm />
                    <FriendRequests />
                </section>

            </main>
        </>
    );
};
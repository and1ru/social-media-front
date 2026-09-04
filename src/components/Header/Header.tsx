import { Link } from "react-router-dom";
import { LogOutButton } from "../LogOutButton/LogOutButton";
import { Theme } from "../Theme/Theme";
import { Languaje } from "../Languaje/Languaje";
import { useState } from "react";
import { useLanguajeContext } from "../../context/languaje/LanguajeContext";
import { es, en } from '../../laguaje'

export const Header = () => {
        const [isVisible, setIsVisible] = useState<boolean>(false)
        const { languaje } = useLanguajeContext()

        const handleClick = () => {
            setIsVisible(!isVisible)
        }
    return (
        <>
            <header className="p-2 dark:bg-gray-800 dark:text-white dark:transition duration-400 ease-in-out">
                <nav>
                    <ul className="flex justify-around items-center">
                        <li className="py-4 px-5 rounded-lg">Chat App</li>
                        <li>
                            <Link to={"/private/chats"} className="hover:bg-gray-200 hover:border-b-2 dark:hover:bg-gray-900 py-4 px-5 rounded-lg hidden md:block">chat</Link>
                        </li>
                        <li>
                            <Link to={"/private/social"} className="hover:bg-gray-200 hover:border-b-2 dark:hover:bg-gray-900 py-4 px-5 rounded-lg hidden md:block">Social</Link>
                        </li>
                        <li>
                            <Link to={"/private/friends"} className="hover:bg-gray-200 hover:border-b-2 dark:hover:bg-gray-900 py-4 px-5 rounded-lg hidden md:block">{ languaje === "en" ? en.headerFriends : es.headerFriends}</Link>
                        </li>
                        <li className="hidden md:block">
                            <Theme />
                        </li>
                        <li className="hidden md:block">
                            <Languaje />
                        </li>
                        <li className="px-3 py-2 hidden md:block">
                            <LogOutButton />
                        </li>
                        <li className="md:hidden">
                            <button onClick={handleClick}>barra</button>
                        </li>
                    </ul>
                </nav>
            </header>
            
            <aside className={`fixed h-full top-0 right-0 w-64 z-50 transition-transform duration-300 ${isVisible ? "translate-x-0" : "translate-x-full"} shadow-2xl md:hidden`}>
                <nav className="h-full w-full">
                    <ul className="flex flex-col h-full w-full bg-white justify-between p-5 border-l border-gray-100">
                        <li className="flex justify-between items-center pb-3 border-b border-gray-100">
                            <p className="font-semibold text-gray-500 text-xs uppercase tracking-wider">Menu</p>
                            <p 
                                onClick={handleClick}
                                className="cursor-pointer font-semibold text-gray-400 hover:text-gray-700 w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                            >
                                X
                            </p>
                        </li>
                        <li className="flex-1 py-4">
                            <div className="space-y-1">
                                <Link to={"/private/chats"} className="px-4 py-2.5 rounded-lg text-gray-700 font-medium hover:bg-indigo-50 transition-colors block">chat</Link>
                                <Link to={"/private/social"} className="px-4 py-2.5 rounded-lg text-gray-700 font-medium hover:bg-indigo-50 transition-colors block">Social</Link>
                                <Link to={"/private/friends"} className="px-4 py-2.5 rounded-lg text-gray-700 font-medium hover:bg-indigo-50 transition-colors block">Friends</Link>
                            </div>
                        </li>
                        <li className="py-3 border-t border-gray-100">
                            <div className="flex flex-col justify-around gap-4 bg-gray-50 p-2 rounded-xl">
                                <Theme />
                                <Languaje />
                            </div>
                        </li>
                        <li className="pt-2 border-t border-gray-100"><LogOutButton /></li>
                    </ul>
                </nav>
            </aside>
        </>

    );
};

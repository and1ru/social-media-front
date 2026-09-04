import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguajeContext } from "../../context/languaje/LanguajeContext";
import { es, en } from '../../laguaje'

export const FindUserForm = () => {
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const { languaje } = useLanguajeContext()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name.trim()) return;

        navigate(`/private/users?name=${name}`);
    };

    return (
        <section>
        <form
            onSubmit={handleSubmit}
            className="flex items-center rounded-2xl border border-gray-200 bg-white p-3 shadow-sm gap-1">
            <input
                type="text"
                placeholder={ languaje === "en" ? en.inputFriends : es.inputFriends}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 rounded-xl border border-gray-300 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-200 px-2 xl:px-4 py-3"/>

            <button
                type="submit"
                className="rounded-xl bg-gray-900 font-medium text-white transition hover:bg-gray-700 active:scale-95 px-2 xl:px-6 py-3">
                { languaje === "en" ? en.buttonFriends : es.buttonFriends}
            </button>
        </form>
        </section>

    );
};
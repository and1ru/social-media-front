import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const FindUser = () => {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name.trim()) return;

        navigate(`/private/users?name=${name}`);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
            <input
                type="text"
                placeholder="Buscar usuario..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-200 "/>

            <button
                type="submit"
                className="rounded-xl bg-gray-900 px-6 py-3 font-medium text-white transition hover:bg-gray-700 active:scale-95">
                Buscar
            </button>
        </form>
    );
};
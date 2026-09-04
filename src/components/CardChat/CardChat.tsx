import { useNavigate } from "react-router-dom";
import { useLanguajeContext } from "../../context/languaje/LanguajeContext";
import { es, en } from '../../laguaje'

interface Props {
    name: string;
    id: string;
}

export const CardChat = ({ name, id }: Props) => {
    const navigate = useNavigate();
    const { languaje } = useLanguajeContext()

    function handleClick(){
        navigate(`/private/chat/${id}`, { replace: true })
        localStorage.setItem("chat-name", name)
    }

    return (
        <article
            onClick={handleClick}
            className="flex items-center justify-between rounded-xl border  border-gray-200 bg-white p-5 shadow-sm cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-md dark:bg-gray-500 dark:text-white">
            <div className="flex items-center gap-4">
                <div
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-lg font-semibold text-gray-700 dark:bg-white">
                    {name[0].toUpperCase()}
                </div>
                <div>
                    <h2 className="font-semibold text-gray-900 dark:text-white">
                        {name}
                    </h2>

                    <p className="text-sm text-gray-500 dark:text-white">
                        { languaje === "en" ? en.chat : es.chat}
                    </p>
                </div>
            </div>
        </article>
    );
};
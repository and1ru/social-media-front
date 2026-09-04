import { useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../../cutomhooks/api.socket";
import { useLanguajeContext } from "../../context/languaje/LanguajeContext";
import { es, en } from '../../laguaje'

export const SendMessage = () => {
    const [message, setMessage] = useState<string>("")
    const { id } = useParams()
    const { languaje } = useLanguajeContext()

    if (!id) return

    function handleMessage(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) {
        setMessage(e.target.value)
    }

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        if (message.trim() === '') {
            return
        }

        socket.emit("send-message", {
            message,
            friendId: id
        })

        setMessage('')
    }

    function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()
        if (message.trim() === '') {
            return
        }

        socket.emit("send-message", {
            message,
            friendId: id
        })

        setMessage('')
    }

    return (
        <section className="border-t border-gray-200 bg-white p-4 dark:bg-gray-800 transition duration-400 ease-in-out">
            <form
                onSubmit={handleSubmit}
                className="flex items-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-2 dark:bg-gray-700">

                <input
                    value={message}
                    onChange={handleMessage}
                    placeholder={ languaje === "en" ? en.inputChat : es.inputChat}
                    className="flex-1 bg-transparent outline-none text-gray-800 placeholder:text-gray-400 "/>

                <button
                    type="button"
                    onClick={handleClick}
                    className="rounded-lg bg-gray-900 px-5 py-2 text-white transition hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-300">
                    { languaje === "en" ? en.buttonSend : es.buttonSend}
                </button>
            </form>
        </section>
    );
};
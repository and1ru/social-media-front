import { useState } from "react";
import { socket } from "../cutomhooks/api.socket";
import { useParams } from "react-router-dom";

export const SendMessageComponent = () => {
    const [message, setMessage] = useState<string>("")
    const { id } = useParams()

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
        <section className="border-t border-gray-200 bg-white p-4">
            <form
                onSubmit={handleSubmit}
                className="flex items-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-2">

                <input
                    value={message}
                    onChange={handleMessage}
                    placeholder="Escribe un mensaje..."
                    className="flex-1 bg-transparent outline-none text-gray-800 placeholder:text-gray-400"/>

                <button
                    type="button"
                    onClick={handleClick}
                    className="rounded-lg bg-gray-900 px-5 py-2 text-white transition hover:bg-gray-700">
                    Enviar
                </button>
            </form>
        </section>
    );
};

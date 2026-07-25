import { useState } from "react";
import { HeaderComponent } from "../components/header-component";
import { useParams } from "react-router-dom";
import { socket } from "../cutomhooks/api.socket";
import { MessageComponent } from "../components/messages-component";

export const ChatPage = () => {
    const [message, setMessage] = useState<string>("")
    const { id } = useParams()

    if(!id) return

    function handleMessage(e:React.ChangeEvent<HTMLInputElement, HTMLInputElement>) {
        setMessage(e.target.value)
    }

    function handleClick(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()
        if(message.trim() === ''){
            return
        }

        socket.emit("send-message", {
            message,
            friendId: id
        })

        setMessage('')
    }

  return (
<>
    <HeaderComponent />

    <main className="flex h-[calc(100vh-64px)] flex-col bg-gray-50">

        {/* Información del chat */}

<section className="flex items-center gap-4">

    <div
        className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-gray-800
            text-lg
            font-semibold
            text-white
        "
    >
        J
    </div>

    <div>

        <h1 className="font-semibold text-gray-900">
            Juan
        </h1>

        <p className="text-sm text-gray-500">
            escribiendo...
        </p>

    </div>

</section>

        {/* Mensajes */}

        <section className="flex-1 overflow-hidden">
            <MessageComponent id={id} />
        </section>

        {/* Input */}

        <section className="border-t border-gray-200 bg-white p-4">

            <form
            onSubmit={e => e.preventDefault()}
                className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    px-4
                    py-2
                "
            >

                <input
                    value={message}
                    onChange={handleMessage}
                    placeholder="Escribe un mensaje..."
                    className="
                        flex-1
                        bg-transparent
                        outline-none
                        text-gray-800
                        placeholder:text-gray-400
                    "
                />

                <button
                    type="button"
                    onClick={handleClick}
                    className="
                        rounded-lg
                        bg-gray-900
                        px-5
                        py-2
                        text-white
                        transition
                        hover:bg-gray-700
                    "
                >
                    Enviar
                </button>

            </form>

        </section>

    </main>
</>
  );
};

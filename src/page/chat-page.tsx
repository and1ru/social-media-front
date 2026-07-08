import { useState } from "react";
import { HeaderComponent } from "../components/header-component";
import { useParams } from "react-router-dom";
import { socket } from "../cutomhooks/api.socket";
import { MessageComponent } from "../components/messages-component";

export const ChatPage = () => {
    const [message, setMessage] = useState<string>("")
    const { id } = useParams()

    function handleMessage(e:React.ChangeEvent<HTMLInputElement, HTMLInputElement>) {
        setMessage(e.target.value)
    }

    function handleClick() {
        if(message.trim() === ''){
            return
        }

        socket.emit("send-message", {
            message,
            friendId: id
        })

        console.log(message)
        console.log(id)

        setMessage('')
    }

  return (
    <>
    <HeaderComponent/>
        <div className="h-20 p-3">
            <p>Nombre</p>
            <p>escribiendo</p>
        </div>
        <MessageComponent/>
        <div>
            <form className="flex rounded-lg p-2">
                <input onChange={handleMessage} type="text" value={message} className="w-full focus:outline-none" placeholder="escribe algo..." />
                <button className="p-2 border-l" type="button" onClick={handleClick}>enviar</button>
            </form>
        </div>
    </>
  );
};

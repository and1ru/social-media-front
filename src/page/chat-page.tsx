import { useState } from "react";
import { MessageTargetComponent } from "../components/message-target-component";

export const ChatPage = () => {
    const [message, setMessage] = useState<string>("")

    function handleMessage(e:React.ChangeEvent<HTMLInputElement, HTMLInputElement>) {
        setMessage(e.target.value)
    }

    function handleClick() {
        console.log(message)
    }

  return (
    <>
        <div className="border h-20"></div>
        <div className="h-114 border">
            <MessageTargetComponent/>
        </div>
        <div>
            <form className="flex border rounded-lg p-2">
                <input onChange={handleMessage} type="text" value={message} className="w-full focus:outline-none" placeholder="escribe algo..." />
                <button className="p-2 border-l" type="button" onClick={handleClick}>enviar</button>
            </form>
        </div>
    </>
  );
};

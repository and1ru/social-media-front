import { useEffect, useState } from "react";
import { MessageTargetComponent } from "./message-target-component";
import { socket } from "../cutomhooks/api.socket";

interface messageT {
    senderId: string;
    message: string;
    createAt: string;
}

export const MessageComponent = () => {
    const [messages, setMessages] = useState<messageT[]>([])

    useEffect(()=> {
        socket.on("receive-message", (data) => {
            console.log(data)
            setMessages(prev => [...prev, data]);
        })

        return () => {
            socket.off("receive-message")
        }
    },[])

  return (
            <div className="flex flex-col gap-5 h-122 border p-3 overflow-auto">
                {messages.map((message) => <MessageTargetComponent createAt={message.createAt} message={message.message}/> )}
        </div>
  );
};

import { useEffect, useState } from "react";
import { useGetMessages } from "../cutomhooks/useGetMessages";
import { MessageTargetComponent } from "./message-target-component";
import { socket } from "../cutomhooks/api.socket";

interface messageT {
    _id: string
    senderId: string;
    message: string;
    createAt: string;
}

interface Props {
    id: string;
}

export const MessageComponent = ({ id }: Props) => {
    const { data } = useGetMessages<messageT>(id)
    const [newMessages, setNewMessages] = useState<messageT[]>([])

    useEffect(() => {
        socket.emit("join-chat", {
            friendId: id
        })

        socket.on("receive-message", (data) => {
            console.log(`los datos son: ${data}`)
            setNewMessages((prevMessage) => [...prevMessage, data])
        })

        return () => {
            socket.off("receive-message");
        };
    }, [])

    return (
        <div className="flex flex-col gap-5 h-122 border p-3 overflow-auto relative">
            {data.map((message) => <MessageTargetComponent createAt={message.createAt} message={message.message} key={message._id} senderId={message.senderId} />)}
            {newMessages.map((message) => <MessageTargetComponent createAt={message.createAt} message={message.message} key={message._id} senderId={message.senderId} />)}
        </div>
    );
};

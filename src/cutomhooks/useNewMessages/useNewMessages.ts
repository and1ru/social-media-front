import { useEffect, useState } from "react";
import { socket } from "./api.socket";

export const useNewMessages = <T>(id:string) => {
        const [newMessages, setNewMessages] = useState<T[]>([]);
    
        useEffect(() => {
            socket.emit("join-chat", {
                friendId: id,
            });
    
            socket.on("receive-message", (message:T) => {
                setNewMessages((prev) => [...prev, message]);
            });
    
            return () => {
                socket.off("receive-message");
            };
        }, [id]);

        return { newMessages}
}
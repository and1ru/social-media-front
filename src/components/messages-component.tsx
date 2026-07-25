import { useEffect, useRef, useState } from "react";
import { useGetMessages } from "../cutomhooks/useGetMessages";
import { MessageTargetComponent } from "./message-target-component";
import { socket } from "../cutomhooks/api.socket";

interface MessageT {
    _id: string;
    senderId: string;
    message: string;
    createAt: string;
}

interface Props {
    id: string;
}

export const MessageComponent = ({ id }: Props) => {
    const { data } = useGetMessages<MessageT>(id);

    const [newMessages, setNewMessages] = useState<MessageT[]>([]);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        socket.emit("join-chat", {
            friendId: id,
        });

        socket.on("receive-message", (message: MessageT) => {
            setNewMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.off("receive-message");
        };
    }, [id]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [data, newMessages]);

    return (
        <section
            className="
                h-full
                overflow-y-auto
                bg-gray-50
                px-4
                py-6
            "
        >
            <div
                className="
                    mx-auto
                    flex
                    max-w-4xl
                    flex-col
                    gap-3
                "
            >
                {data.map((message) => (
                    <MessageTargetComponent
                        key={message._id}
                        senderId={message.senderId}
                        message={message.message}
                        createAt={message.createAt}
                    />
                ))}

                {newMessages.map((message) => (
                    <MessageTargetComponent
                        key={message._id}
                        senderId={message.senderId}
                        message={message.message}
                        createAt={message.createAt}
                    />
                ))}

                <div ref={messagesEndRef} />
            </div>
        </section>
    );
};
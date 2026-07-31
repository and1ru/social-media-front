import { useEffect, useRef } from "react";
import { useGetMessages } from "../../cutomhooks/useGetMessages";
import { MessageTargetComponent } from "../message-target-component/message-target-component";
import { useParams } from "react-router-dom";
import { useNewMessages } from "../../cutomhooks/useNewMessages";

interface MessageT {
    _id: string;
    senderId: string;
    message: string;
    createAt: string;
}

export const MessageComponent = () => {
    const { id } = useParams()
    if (!id) return

    const { data } = useGetMessages<MessageT>(id);
    const { newMessages } = useNewMessages<MessageT>(id)

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [data, newMessages]);

    return (
        <section className="h-full overflow-y-auto bg-gray-50 px-4 py-6">
            <div className="mx-auto flex max-w-4xl flex-col gap-3">
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
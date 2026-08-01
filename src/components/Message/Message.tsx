import { useParams } from "react-router-dom";

interface Props {
    message: string;
    createAt: string;
    senderId: string;
}

export const Message = ({createAt,message,senderId,}: Props) => {
    const { id } = useParams();

    const isMyMessage = id === senderId;

    return (
        <div
            className={`flex ${isMyMessage ? "justify-start" : "justify-end"}`}>
            <article
                className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${isMyMessage 
                    ? "bg-gray-900 text-white rounded-br-md"
                    : "bg-white text-gray-900 border border-gray-200 rounded-bl-md"
                    }
                `}>
                <p className="text-sm leading-6">
                    {message}
                </p>
                <p
                    className={`mt-2 text-right text-xs ${isMyMessage ? "text-gray-300" : "text-gray-500"}`}>
                    {createAt}
                </p>
            </article>
        </div>
    );
};
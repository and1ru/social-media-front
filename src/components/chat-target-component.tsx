import { useNavigate } from "react-router-dom";

interface Props {
    name: string;
    id: string;
}

export const ChatTargetComponent = ({ name, id }: Props) => {
    const navigate = useNavigate();

    return (
        <article
            onClick={() => navigate(`/private/chat/${id}`, { replace: true })}
            className="flex items-center justify-between rounded-xl border  border-gray-200 bg-white p-5 shadow-sm cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-md">
            <div className="flex items-center gap-4">
                <div
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-lg font-semibold text-gray-700">
                    {name[0].toUpperCase()}
                </div>
                <div>
                    <h2 className="font-semibold text-gray-900">
                        {name}
                    </h2>

                    <p className="text-sm text-gray-500">
                        Click to open chat
                    </p>
                </div>
            </div>
        </article>
    );
};
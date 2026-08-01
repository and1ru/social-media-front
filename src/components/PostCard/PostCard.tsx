import { useNavigate } from "react-router-dom";
import { DeletePost } from "../DeletePost/DeletePost";
import { CommentButton } from "../CommentButton/CommentButton";
import { CopyButton } from "../CopyButton/CopyButton";
import { LikeButton } from "../LikeButton/LikeButton";

interface Props {
    id: string
    contenido: string;
    fecha: string;
    name: string;
    userId: string;
}

export const PostCard = ({ contenido, fecha, id, name, userId }: Props) => {

    const navigate = useNavigate()

    const handleCick = () => {
        navigate(`/private/user/${userId}`, { replace: true })
    }

    const authId = localStorage.getItem("userId")

    return (
        <section className="mx-auto max-w-3xl">
            <article className="rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
                <header className="flex items-center gap-4 border-b border-gray-100 p-5">
                    <div
                        onClick={handleCick}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 font-semibold text-white cursor-pointer">
                        {name[0].toUpperCase()}
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-900">
                            {name}
                        </h2>
                        <p className="text-sm text-gray-500">
                            {fecha}
                        </p>
                    </div>
                    {authId === userId && <DeletePost />}
                </header>
                <section className="p-5">
                    <p className="whitespace-pre-wrap leading-7 text-gray-800">
                        {contenido}
                    </p>
                </section>
                <footer className="flex items-center justify-around border-t border-gray-100 p-3">
                    <LikeButton id={id} />
                    <CommentButton postId={id} />
                    <CopyButton id={id} />
                </footer>
            </article>
        </section>
    );
};
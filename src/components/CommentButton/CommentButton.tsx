import { useRef, useState } from "react";
import { useComment } from "../../cutomhooks/useComment/useComment";
import { useGetComment } from "../../cutomhooks/useGetComment/useGetComment";

interface Props {
    postId: string;
}

export const CommentButton = ({ postId }: Props) => {
    const [value, setValue] = useState<string>("")
    const { data, loading, error, refetch } = useGetComment(postId)
    const { comment } = useComment()
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    function openDialog() {
        dialogRef.current?.showModal()
    }

    function closeDialog() {
        dialogRef.current?.close()
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const handleComment = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (value.trim() === "") {
            return
        }

        const body = {
            comment: value,
            postId
        }

        await comment(body)
        await refetch()
        setValue("")
    }

    return (
        <>
            <button
                onClick={openDialog}
                className="flex flex-1 justify-center rounded-lg py-2 transition hover:bg-gray-100">
                💬 {data?.commentCount}
            </button>
            <dialog
                ref={dialogRef}
                className="w-[95%] max-w-xl rounded-2xl bg-white p-6 shadow-2xl backdrop:bg-black/60 m-auto">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                        Comentarios
                    </h2>
                    <button
                        onClick={closeDialog}
                        className="rounded-lg px-3 py-2 transition hover:bg-gray-100">
                        ✕
                    </button>
                </div>

                <div className="px-10 py-10 mt-6 flex flex-col gap-3 overflow-y-auto h-80 items-center justify-center rounded-xl border border-dashed border-gray-300">
                    {loading && <p>cargando comentarios</p>}
                    {error && <p>error al intentar cargar los comentarios</p>}
                    {data?.commentCount === 0 ? <p>no comments yet</p> : 
                        data?.comments.map((comentario) => (<div className="w-full border p-3 rounded-lg flex gap-3" key={comentario._id}>
                            <div className="">
                                <p className="p-2 rounded-2xl w-10 text-center bg-gray-700 text-white">{comentario.userName[0].toUpperCase()}</p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <p>{comentario.userName}</p>
                                <p>{comentario.comment}</p>
                            </div>

                        </div>))}
                </div>

                <form 
                    onSubmit={handleComment}
                    className="mt-6 flex gap-3">
                    <input
                        value={value}
                        onChange={handleInput}
                        placeholder="Escribe un comentario..."
                        className="flex-1 rounded-xl border  border-gray-300 px-4 py-3 outline-none  focus:border-gray-900" />
                    <button
                        disabled={loading}
                        type="submit"
                        className="rounded-xl bg-gray-900 px-5 text-white transition hover:bg-gray-700">
                        { loading ? "enviando..." : "Enviar"}
                    </button>
                </form>
            </dialog>
        </>
    );
};

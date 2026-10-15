import { useRef } from "react";
import { useDeletePost } from "../../cutomhooks/useDeletePost/useDeletePost";
import { useLanguajeContext } from "../../context/languaje/LanguajeContext";

interface Props {
    postId: string
}

export const DeletePost = ({ postId }: Props) => {
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const { deletePost } = useDeletePost()
    const { languaje } = useLanguajeContext()
    const openDialog = () => {
        dialogRef.current?.showModal();
    };

    const closeDialog = () => {
        dialogRef.current?.close();
    };

    const handleDelete = () => {
        deletePost(postId)
        location.reload()
        closeDialog();
    };

    return (
        <>
            <button
                onClick={openDialog}
                className="rounded-lg px-3 py-2 text-md  font-medium text-red-600 transition hover:bg-red-50 hover:text-red-700 dark:hover:bg-gray-600"
            >
                { languaje === "en" ? "Delete" : "Eliminar" }
            </button>

            <dialog
                ref={dialogRef}
                className="w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-2xl backdrop:bg-black/60 m-auto"
            >
                <div className="flex flex-col gap-6">
                    <div className="text-center">
                        <h2 className="text-xl font-semibold text-gray-900">
                            { languaje === "en" ? "Delete Post" : "Eliminar publicación" }
                        </h2>

                        <p className="mt-3 text-gray-600">
                            { languaje === "en" ? "This action does not can be removed, Are you sure you want to delete the post?" : "Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar este post?" }
                        </p>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            onClick={closeDialog}
                            className="rounded-xl border border-gray-300 px-5 py-2 transition hover:bg-gray-100"
                        >
                            { languaje === "en" ? "Cancel" : "Cancelar" }
                        </button>

                        <button
                            onClick={handleDelete}
                            className="rounded-xl bg-red-600 px-5 py-2 text-white transition hover:bg-red-700"
                        >
                            { languaje === "en" ? "Confirm" : "Confirmar" }
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
};
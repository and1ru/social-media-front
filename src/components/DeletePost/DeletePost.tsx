import { useRef } from "react";
import { useDeletePost } from "../../cutomhooks/useDeletePost/useDeletePost";

interface Props {
    postId:string
}

export const DeletePost = ({postId}:Props) => {
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const { deletePost } = useDeletePost()
    const openDialog = () => {
        dialogRef.current?.showModal();
    };

    const closeDialog = () => {
        dialogRef.current?.close();
    };

    const handleDelete = () => {
        // Aquí irá la petición para eliminar el post
        deletePost(postId)
        location.reload()
        closeDialog();
    };



    return (
        <>
            <button
                onClick={openDialog}
                className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 hover:text-red-700 dark:hover:bg-gray-600"
            >
                Eliminar
            </button>

            <dialog
                ref={dialogRef}
                className="w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-2xl backdrop:bg-black/60 m-auto"
            >
                <div className="flex flex-col gap-6">
                    <div className="text-center">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Eliminar publicación
                        </h2>

                        <p className="mt-3 text-gray-600">
                            Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar este post?
                        </p>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            onClick={closeDialog}
                            className="rounded-xl border border-gray-300 px-5 py-2 transition hover:bg-gray-100"
                        >
                            Cancelar
                        </button>

                        <button
                            onClick={handleDelete}
                            className="rounded-xl bg-red-600 px-5 py-2 text-white transition hover:bg-red-700"
                        >
                            Confirmar
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
};
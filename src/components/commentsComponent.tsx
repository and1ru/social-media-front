import { useRef } from "react";

interface Props {
    comentarios?: string[];
}

export const CommentsComponent = ({ comentarios }: Props) => {
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    function openDialog (){
        dialogRef.current?.showModal()
    }

    function closeDialog (){
        dialogRef.current?.close()
    }

    return (
        <>
            <button
                onClick={openDialog}
                className="flex flex-1 justify-center rounded-lg py-2 transition hover:bg-gray-100">
                💬 {comentarios?.length ?? 0}
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

                <div className="mt-6 flex h-72 items-center justify-center rounded-xl border border-dashed border-gray-300">
                    <p className="text-gray-500">
                        No hay comentarios todavía.
                    </p>
                </div>
                <form className="mt-6 flex gap-3">
                    <input
                        placeholder="Escribe un comentario..."
                        className="flex-1 rounded-xl border  border-gray-300 px-4 py-3 outline-none  focus:border-gray-900" />
                    <button
                        className="rounded-xl bg-gray-900 px-5 text-white transition hover:bg-gray-700">
                        Enviar
                    </button>
                </form>
            </dialog>
        </>
    );
};

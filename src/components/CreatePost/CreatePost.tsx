import { useEffect, useRef, useState } from "react";
import { useCreatePost } from "../../cutomhooks/useCreatePost/useCreatePost";
import { SuccessMessage } from "../SuccesMessage/SuccesMessage";

export const CreatePost = () => {
    const [value, setValue] = useState("");
    const [created, setCreated] = useState(false)

    const dialogRef = useRef<HTMLDialogElement | null>(null);

    const { createPost, error, loading, success } = useCreatePost();

    const handleOpen = () => dialogRef.current?.showModal();

    const handleClose = () => {
        dialogRef.current?.close();
        setValue("");
    };

    const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!value.trim()) return;

        await createPost(value);

        if (!error) {
            handleClose();
        }
    };

    useEffect(()=> {
        const timer = setTimeout(() => {
            setCreated(false)
        },3000)
        if(success){
            setCreated(true)
        }

        return () => {timer}
    },[success])

    return (
        <>
        { created &&         
        <SuccessMessage>
            <p>se creo el post correctamente</p>
        </SuccessMessage>
        }

        <section>
            <button
                onClick={handleOpen}
                className="rounded-xl bg-gray-900 px-6 py-3 font-medium text-white transition hover:bg-gray-700 active:scale-95">
                Crear publicación
            </button>
            <dialog
                ref={dialogRef}
                className="m-auto w-[95%] max-w-xl rounded-2xl bg-white p-8 shadow-2xl backdrop:bg-black/60">
                <h2 className="text-2xl font-bold text-gray-900">
                    Crear publicación
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                    Comparte algo con tus amigos.
                </p>
                <form
                    onSubmit={handleForm}
                    className="mt-6 flex flex-col gap-5"
                >
                    <textarea
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="¿Qué estás pensando?"
                        className="h-56 resize-none rounded-xl border border-gray-300 p-4 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
                    />
                    <div className="flex items-center justify-between">
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="rounded-lg border border-gray-300 px-5 py-2 transition hover:bg-gray-100">
                                Cancelar
                            </button>

                            <button
                                disabled={loading}
                                className="rounded-lg bg-gray-900 px-5 py-2 text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50">
                                {loading ? "Publicando..." : "Publicar"}
                            </button>
                        </div>
                    </div>
                </form>
            </dialog>
        </section>
        </>
        
    );
};
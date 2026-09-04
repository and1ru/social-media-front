import { useEffect, useRef, useState } from "react";
import { useCreatePost } from "../../cutomhooks/useCreatePost/useCreatePost";
import { SuccessMessage } from "../SuccesMessage/SuccesMessage";
import { useLanguajeContext } from "../../context/languaje/LanguajeContext";
import { es, en } from '../../laguaje'

export const CreatePost = () => {
    const [value, setValue] = useState("");
    const [created, setCreated] = useState(false)
    const {languaje} = useLanguajeContext()
    const { createPost, error, loading, success } = useCreatePost();

    const dialogRef = useRef<HTMLDialogElement | null>(null);


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
                className="rounded-xl bg-gray-800 px-6 py-3 font-medium text-white transition hover:bg-gray-700 active:scale-95 dark:hover:bg-gray-900">
                { languaje === "en" ? en.buttonCreatePost : es.buttonCreatePost}

            </button>
            <dialog
                ref={dialogRef}
                className="m-auto w-[95%] max-w-xl rounded-2xl bg-white p-8 shadow-2xl backdrop:bg-black/60 dark:bg-gray-800">
               
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                { languaje === "en" ? en.buttonCreatePost : es.buttonCreatePost}
                    
                </h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-white">
                    { languaje === "en" ? en.socialMessage : es.socialMessage}
                </p>
                <form
                    onSubmit={handleForm}
                    className="mt-6 flex flex-col gap-5"
                >
                    <textarea
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={languaje === "en" ? en.inputPost : es.inputPost}
                        className="h-56 resize-none rounded-xl border border-gray-300 p-4 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-200 dark:bg-gray-600 dark:placeholder:text-white dark:text-white"
                    />
                    <div className="flex items-center justify-between">
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="rounded-lg border border-gray-300 px-5 py-2 transition hover:bg-gray-100 dark:bg-white">
                                { languaje === "en" ? en.buttonCancel : es.buttonCancel}
                            </button>

                            <button
                                disabled={loading}
                                className="rounded-lg bg-gray-900 px-5 py-2 text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50">
                                {loading ? "Publicando..." :  languaje === "en" ? en.buttonPost : es.buttonPost }
                            </button>
                        </div>
                    </div>
                </form>
            </dialog>
        </section>
        </>
        
    );
};
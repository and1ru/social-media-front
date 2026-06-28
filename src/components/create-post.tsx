import { useRef, useState } from "react";
import { useCreatePost } from "../cutomhooks/useCreatePost";

export const CreatePost = () => {
    const [value, setValue] = useState("")
    const dialogRef = useRef<HTMLDialogElement | null>(null)
    const {createPost, error, loading, success} = useCreatePost()

    function handleOpen() {
        dialogRef.current?.showModal()
    }

    function handleClose() {
        dialogRef.current?.close()
    }

    function handleValue(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setValue(e.target.value)
    }

    const handleForm = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        await createPost(value)
    }

  return (
    <section>
        <button className="p-2 border rounded-lg" onClick={handleOpen}>Crear Post</button>
        <dialog ref={dialogRef} className="w-100 h-100 p-5">
            <h1 className="text-center text-2xl font-bold mb-5">create post</h1>
            <form className="flex flex-col gap-5 mb-5" onSubmit={handleForm}>
                <textarea 
                value={value}
                onChange={handleValue}
                name="" id="" className="border p-2 focus:outline-none rounded-lg resize-none h-50"></textarea>
                <button className="w-full p-2 border rounded-lg">crear</button>
            </form>
            <button onClick={handleClose} className="w-full p-2 border rounded-lg" >Cerrar</button>
        </dialog>
        {loading && <p>loading...</p>}
        {error && <p>error al intentar crear un post</p>}
        {success && <p>se creo el post exitosamente</p>}
    </section>
  );
};

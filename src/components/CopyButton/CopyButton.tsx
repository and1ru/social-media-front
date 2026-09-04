import { useState } from "react";
import { useLanguajeContext } from "../../context/languaje/LanguajeContext";
import { es, en } from '../../laguaje'

interface Props {
    id: string
}
export const CopyButton = ({ id }: Props) => {
    const [isCopied, setIsCopied] = useState<boolean>(false)
    const { languaje } = useLanguajeContext()

    const handleClick = async () => {
        try {
            await navigator.clipboard.writeText(`http://localhost:5173/private/post/${id}`)
            setIsCopied(true)
            setTimeout(() => {
                setIsCopied(false)
            },2000)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
        { isCopied && <article className="fixed top-5 mx-auto bg-green-500 px-5 py-3 rounded-lg">se copio el post con exito</article>}
            <button 
                onClick={handleClick}
                className="flex flex-1 justify-center rounded-lg py-2 transition hover:bg-gray-100 dark:hover:bg-gray-600">
                📤 { languaje === "en" ? en.buttonCopy : es.buttonCopy}
            </button>
        </>

    );
};

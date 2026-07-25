import { useRef } from "react";

interface Props {
    contenido: string;
    fecha: string;
    likes: number;
    comentarios?: string[];
}

export const PostTargetComponent = ({
    contenido,
    fecha,
    likes,
    comentarios,
}: Props) => {
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    return (
        <>
            <article
                className="
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    shadow-sm
                    transition
                    hover:shadow-md
                "
            >
                {/* Header */}

                <header
                    className="
                        flex
                        items-center
                        gap-4
                        border-b
                        border-gray-100
                        p-5
                    "
                >
                    <div
                        className="
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-full
                            bg-gray-900
                            font-semibold
                            text-white
                        "
                    >
                        U
                    </div>

                    <div>
                        <h2 className="font-semibold text-gray-900">
                            Nombre Usuario
                        </h2>

                        <p className="text-sm text-gray-500">
                            {fecha}
                        </p>
                    </div>
                </header>

                {/* Contenido */}

                <section className="p-5">
                    <p className="whitespace-pre-wrap leading-7 text-gray-800">
                        {contenido}
                    </p>
                </section>

                {/* Footer */}

                <footer
                    className="
                        flex
                        items-center
                        justify-around
                        border-t
                        border-gray-100
                        p-3
                    "
                >
                    <button
                        className="
                            flex
                            flex-1
                            justify-center
                            rounded-lg
                            py-2
                            transition
                            hover:bg-gray-100
                        "
                    >
                        ❤️ {likes}
                    </button>

                    <button
                        onClick={() => dialogRef.current?.showModal()}
                        className="
                            flex
                            flex-1
                            justify-center
                            rounded-lg
                            py-2
                            transition
                            hover:bg-gray-100
                        "
                    >
                        💬 {comentarios?.length ?? 0}
                    </button>

                    <button
                        className="
                            flex
                            flex-1
                            justify-center
                            rounded-lg
                            py-2
                            transition
                            hover:bg-gray-100
                        "
                    >
                        📤 Compartir
                    </button>
                </footer>
            </article>

            <dialog
                ref={dialogRef}
                className="
                    w-[95%]
                    max-w-xl
                    rounded-2xl
                    bg-white
                    p-6
                    shadow-2xl
                    backdrop:bg-black/60
                "
            >
                <div className="flex items-center justify-between">

                    <h2 className="text-xl font-semibold">
                        Comentarios
                    </h2>

                    <button
                        onClick={() => dialogRef.current?.close()}
                        className="
                            rounded-lg
                            px-3
                            py-2
                            transition
                            hover:bg-gray-100
                        "
                    >
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
                        className="
                            flex-1
                            rounded-xl
                            border
                            border-gray-300
                            px-4
                            py-3
                            outline-none
                            focus:border-gray-900
                        "
                    />

                    <button
                        className="
                            rounded-xl
                            bg-gray-900
                            px-5
                            text-white
                            transition
                            hover:bg-gray-700
                        "
                    >
                        Enviar
                    </button>

                </form>

            </dialog>
        </>
    );
};
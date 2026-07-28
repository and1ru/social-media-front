import { CommentsComponent } from "./commentsComponent";
import { CopyComponent } from "./copy-component";
import { LikeComponent } from "./like-component";

interface Props {
    id:string
    contenido: string;
    fecha: string;
    comentarios?: string[];
}

export const PostTargetComponent = ({ contenido, fecha, id }: Props) => {
    return (
        <article className="rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
            <header className="flex items-center gap-4 border-b border-gray-100 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 font-semibold text-white">
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
            <section className="p-5">
                <p className="whitespace-pre-wrap leading-7 text-gray-800">
                    {contenido}
                </p>
            </section>
            <footer className="flex items-center justify-around border-t border-gray-100 p-3">
                <LikeComponent id={id}/>
                <CommentsComponent postId={id} />
                <CopyComponent id={id}/>
            </footer>
        </article>
    );
};
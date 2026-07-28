import { useGetPosts } from "../cutomhooks/useGetPost";
import type { postsType } from "../schemas/posts-schema";
import { PostTargetComponent } from "./post-target-component";

export const PostsComponents = () => {
    const { data, loading } = useGetPosts<postsType>()
    return (
        <section className="flex flex-col gap-6 mt-8">
            {data?.length ? (
                data.map((post) => (
                    <PostTargetComponent
                        id={post._id}
                        key={post._id}
                        contenido={post.content}
                        fecha={post.fecha}
                    />
                ))
            ) : (
                !loading && (
                    <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
                        No hay publicaciones todavía.
                    </div>
                )
            )}
        </section>
    );
};

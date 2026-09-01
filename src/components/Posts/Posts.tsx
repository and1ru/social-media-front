import { useGetPosts } from "../../cutomhooks/useGetPost/useGetPost";
import type { postsType } from "../../schemas/posts-schema";
import { PostCard } from "../PostCard/PostCard";


export const Posts = () => {
    const { data } = useGetPosts<postsType>()
    return (
        <section className="flex flex-col gap-6 mt-8">
            {
                data?.map((post) => (
                    <PostCard
                        name={post.name}
                        id={post._id}
                        key={post._id}
                        contenido={post.content}
                        fecha={post.fecha}
                        userId={post.userId}
                    />
                ))
            }


        </section>
    );
};

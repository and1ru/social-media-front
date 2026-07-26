import { CreatePost } from "../components/create-post";
import { HeaderComponent } from "../components/header-component";
import { PostTargetComponent } from "../components/post-target-component";
import { useGetPosts } from "../cutomhooks/useGetPost";
import { type postsType } from "../schemas/posts-schema";

export const SocialPage = () => {
    const { data, error, loading } = useGetPosts<postsType>();

    return (
        <>
            <HeaderComponent />
            <main className="min-h-[calc(100vh-64px)] bg-gray-50 py-8 px-4">
                <section className="mx-auto max-w-3xl">
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Social
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Comparte algo con tus amigos.
                        </p>
                    </header>
                    {loading && (
                        <div className="mb-6 rounded-xl bg-blue-50 p-4 text-center text-blue-700">
                            Loading posts...
                        </div>
                    )}
                    {error && (
                        <div className="mb-6 rounded-xl bg-red-50 p-4 text-center text-red-700">
                            {error}
                        </div>
                    )}
                    <div className="mb-8">
                        <CreatePost />
                    </div>
                    <section className="flex flex-col gap-6">
                        {data?.length ? (
                            data.map((post) => (
                                <PostTargetComponent
                                    key={post._id}
                                    contenido={post.content}
                                    fecha={post.fecha}
                                    likes={post.likes}
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
                </section>
            </main>
        </>
    );
};
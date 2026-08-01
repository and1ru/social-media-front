import { CreatePost } from "../../components/CreatePost/CreatePost";
import { HeaderComponent } from "../components/header-component";
import { PostsComponents } from "../components/postsComponents";
import { useGetPosts } from "../../cutomhooks/useGetPost/useGetPost";
import { type postsType } from "../../schemas/posts-schema";

export const SocialPage = () => {
    const { error, loading } = useGetPosts<postsType>();

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
                    <CreatePost />
                    <PostsComponents />
                </section>
            </main>
        </>
    );
};
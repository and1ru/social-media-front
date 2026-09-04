import { CreatePost } from "../../components/CreatePost/CreatePost";
import { Header } from "../../components/Header/Header";
import { Posts } from "../../components/Posts/Posts";
import { useGetPosts } from "../../cutomhooks/useGetPost/useGetPost";
import { type postsType } from "../../schemas/posts-schema";
import { useLanguajeContext } from "../../context/languaje/LanguajeContext";
import { es, en } from '../../laguaje'

export const SocialPage = () => {
    const { error, loading } = useGetPosts<postsType>();
    const { languaje } = useLanguajeContext()

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50 py-8 px-4 dark:bg-gray-700 duration-400 ease-in-out">
                <section className="mx-auto max-w-3xl">
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Social
                        </h1>

                        <p className="mt-2 text-gray-500 dark:text-white">
                            { languaje === "en" ? en.socialMessage : es.socialMessage}
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
                    <Posts />
                </section>
            </main>
        </>
    );
};
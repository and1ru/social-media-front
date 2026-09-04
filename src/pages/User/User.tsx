import { useParams } from "react-router-dom";
import { usePostUser } from "../../cutomhooks/usePostUser/usePostUser";
import { Header } from "../../components/Header/Header";
import { PostCard } from "../../components/PostCard/PostCard";

// para obtener el nombre del usuario entonces enviar el userId y el nombre

export const UserPage = () => {
  const {id} = useParams()
  if(!id) return
  const { data, loading, error } = usePostUser(id)

  if(loading) return <p>loading</p>
  if(error) return <p>error</p>
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-64px)] bg-gray-50 py-8 px-4 dark:bg-gray-700">
        <section className="mx-auto max-w-3xl mb-8">
          <div className="flex items-center gap-10">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gray-200 text-4xl font-bold text-gray-600">
              {data[0]?.name[0].toUpperCase()}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {data[0]?.name}
            </h1>
          </div>
        </section >
        <section className="mx-auto max-w-3xl flex flex-col gap-5">
          { data.map((post) => (<PostCard key={post._id} contenido={post.content} fecha={post.fecha} id={post._id} name={post.name} userId={post.userId} />))}
        </section>
      </main>

    </>
  );
};

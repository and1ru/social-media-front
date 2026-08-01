import { useParams } from "react-router-dom";
import { usePost } from "../../cutomhooks/usePost/usePost";
import { Header } from "../../components/Header/Header";
import { PostCard } from "../../components/PostCard/PostCard";

export const PostPage = () => {
  const { id } = useParams()
  if (!id) return
  const { data, loading } = usePost(id)

  if (loading) return <p>cargando</p>
  if (!data) return <p>no se encontro el post</p>

  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-64px)] bg-gray-50 py-8 px-4">
        <PostCard contenido={data.content} fecha={data.fecha} id={data._id} name={data.name} userId={data.userId} />
      </main>
    </>

  );
};
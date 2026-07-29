import { useParams } from "react-router-dom";
import { HeaderComponent } from "../components/header-component";
import { PostTargetComponent } from "../components/post-target-component";
import { usePost } from "../cutomhooks/usePost";

export const PostPage = () => {
  const { id } = useParams()
  if(!id) return
  const { data, loading } = usePost(id)

  if(loading) return <p>cargando</p>
  if(!data) return <p>no se encontro el post</p>
  
  return (
    <>
      <HeaderComponent />
      <main className="min-h-[calc(100vh-64px)] bg-gray-50 py-8 px-4">
        <section className="mx-auto max-w-3xl">
          <PostTargetComponent contenido={data.content} fecha={data.fecha} id={data._id} name={data.name} userId={data.userId} />
        </section>
      </main>
    </>

  );
};
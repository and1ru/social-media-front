import { useParams } from "react-router-dom";
import { HeaderComponent } from "../components/header-component";
import { PostTargetComponent } from "../components/post-target-component";
import { usePostUser } from "../cutomhooks/usePostUser";

// para obtener el nombre del usuario entonces enviar el userId y el nombre

export const UserPage = () => {
  const {id} = useParams()
  if(!id) return
  const { data, loading, error } = usePostUser(id)

  if(loading) return <p>loading</p>
  if(error) return <p>error</p>
  return (
    <>
      <HeaderComponent />
      <main className="min-h-[calc(100vh-64px)] bg-gray-50 py-8 px-4">


        <section className="mx-auto max-w-3xl mb-8">
          <div className="flex items-center gap-10">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gray-200 text-4xl font-bold text-gray-600">
              {data[0]?.name[0].toUpperCase()}
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              <p>{data[0]?.name}</p> 
            </h1>
          </div>
        </section >


        <section className="mx-auto max-w-3xl flex flex-col gap-5">
          { data.map((post) => (<PostTargetComponent key={post._id} contenido={post.content} fecha={post.fecha} id={post._id} name={post.name} userId={post.userId} />))}
        </section>
      </main>

    </>
  );
};

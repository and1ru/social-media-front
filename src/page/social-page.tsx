import { CreatePost } from "../components/create-post";
import { HeaderComponent } from "../components/header-component";
import { PostTargetComponent } from "../components/post-target-component";
import { useGetPosts } from "../cutomhooks/useGetPost";
import {type postsType} from '../schemas/posts-schema'

export const SocialPage = () => {
  const { data, error, loading} = useGetPosts<postsType>()

  {error && <p>error</p>}
  {loading && <p>loading</p>}

  return (
    <>
    <HeaderComponent/>
        <h1 className="text-center text-2xl font-bold mb-7">Social</h1>
        <CreatePost/>
        <section className="flex flex-col gap-10">
          {data?.map((post) => <PostTargetComponent key={post._id} contenido={post.content} fecha={post.fecha} likes={post.likes} />)}
        </section>
    </>
  );
};

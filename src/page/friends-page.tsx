import { FindUser } from "../components/fiend-users";
import { FreindTargetComponent } from "../components/friend-target-component";
import { HeaderComponent } from "../components/header-component";
import { useGetRequest } from "../cutomhooks/useGetRequest";
import { type requestType } from "../schemas/request-schema";

export const FriendsPage = () => {
  const {data, error, loading} = useGetRequest<requestType>()
  if(loading) return <p>cargando</p>
  if(error) return <p>error</p>

  return (
    <>
        <HeaderComponent/>
        <h1 className="text-2xl text-center font-bold mb-8">Friends</h1>
        <FindUser/>
        <section className="flex flex-col gap-7">
          {data.map((request) => <FreindTargetComponent key={request._id} id={request._id}/> )}
        </section>
    </>
  );
};
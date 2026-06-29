import {useSearchParams } from "react-router-dom";
import { HeaderComponent } from "../components/header-component";
import { UserTarget } from "../components/user-target";
import { useFindUsers } from "../cutomhooks/useFindUsers";
import type { userType } from "../schemas/user-schema";

export const UsersPage = () => {
  const [search] = useSearchParams()
  const name = search.get("name")

  if(!name){
    return 
  }

  const { data, error, loading } = useFindUsers<userType>(name)

  if(error) return <p>error</p>
  if(loading) return <p>loading</p>
  return (
    <>
        <HeaderComponent/>
        <main className="p-5">
          <section className="flex flex-col gap-5">
            {data.map((user) => <UserTarget name={user.name} key={user._id} id={user._id}/> )}
          </section>
        </main>
    </>
  );
};

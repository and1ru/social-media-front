import {useSearchParams } from "react-router-dom";
import { HeaderComponent } from "../components/header-component";

export const UsersPage = () => {
  const [search] = useSearchParams()
  const name = search.get("name")

  return (
    <>
        <HeaderComponent/>
        <main>
          {name}
        </main>
    </>
  );
};

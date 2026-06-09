import { Outlet } from "react-router-dom";
import { HeaderComponent } from "../components/header-component";

export const RootPage = () => {
  return (
    <>
        <HeaderComponent/>
        <main className="p-5 h-sreen"><Outlet/></main>
    </>
  );
};

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../cutomhooks/useAuth";

export const RootPage = () => {
  const { authenticated, loading } = useAuth()

  if(loading){
    return  <p>cargando</p>
  }
  if(!authenticated){
    return <Navigate to="/login"/>
  }

  return (
    <>
      <Outlet/>
    </>
  );
};

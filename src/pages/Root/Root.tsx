import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../cutomhooks/useAuth/useAuth";
import { useAuthContext } from "../../context/auth/AuthContext";
import { useEffect } from "react";

export const RootPage = () => {
  const { authenticated, loading, data } = useAuth()
  const { setAuth } = useAuthContext()

  useEffect(()=> {
    if(authenticated){
      setAuth({id:data.result.userId, name:data.result.name })
    }
  },[authenticated])
  
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

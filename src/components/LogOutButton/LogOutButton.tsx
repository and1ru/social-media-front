import { useNavigate } from "react-router-dom";
import { useLogOut } from "../../cutomhooks/useLogOut/useLogOut";

export const LogOutButton = () => {
    const { loading, success, logOut } = useLogOut()
    const navegar = useNavigate()
    async function handleClick() {
        await logOut()
        if(success){
            await navegar("/login", {replace:true})
        }
    }
    if(!loading) <p>cargando</p>
  return (
    <button 
    className="bg-red-500 px-3 py-2"
    onClick={handleClick}>salir</button>
  );
};

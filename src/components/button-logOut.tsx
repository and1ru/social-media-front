import { useNavigate } from "react-router-dom";
import { useLogOut } from "../cutomhooks/useLogOut";

export const ButtonLogOut = () => {
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
    <button onClick={handleClick}>salir</button>
  );
};

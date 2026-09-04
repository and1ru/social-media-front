import { useNavigate } from "react-router-dom";
import { useLogOut } from "../../cutomhooks/useLogOut/useLogOut";
import { useLanguajeContext } from "../../context/languaje/LanguajeContext";
import { es, en } from '../../laguaje'

export const LogOutButton = () => {
  const { languaje } = useLanguajeContext()
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
    className="bg-red-500 px-3 py-2 w-full rounded-lg text-white font-bold text-xl"
    onClick={handleClick}>{ languaje === "en" ? en.buttonLogOut : es.buttonLogOut}</button>
  );
};
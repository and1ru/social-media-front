import { useNavigate } from "react-router-dom";
import { useLogOut } from "../../cutomhooks/useLogOut/useLogOut";
import { useLanguajeContext } from "../../context/languaje/LanguajeContext";
import { es, en } from '../../laguaje'
import { useEffect } from "react";

export const LogOutButton = () => {
  const { languaje } = useLanguajeContext()
  const { success, logOut } = useLogOut()
  const navegar = useNavigate()

  function handleClick() {
    logOut()
  }

  useEffect(() => {
    if (success) {
      navegar("/login", { replace: true })
    }
  }, [success])

  return (
    <button
      className="bg-red-500 px-3 py-2 w-full rounded-lg text-white font-bold text-xl"
      onClick={handleClick}>{languaje === "en" ? en.buttonLogOut : es.buttonLogOut}
    </button>
  );
};
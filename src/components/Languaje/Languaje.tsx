import { useLanguajeContext } from "../../context/languaje/LanguajeContext";

export const Languaje = () => {
    const { setLanguaje, languaje } = useLanguajeContext()

    const handleLanguaje = (e:React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setLanguaje(value)

        if(languaje === "en"){
          document.documentElement.lang = "es"
        }
        if(languaje === "es"){
          document.documentElement.lang = "en"
        }
    }

  return (
    <select onChange={handleLanguaje} className="border outline-none p-2 rounded-lg dark:bg-gray-800 dark:text-white">
      { languaje === "en" ? <><option value="en">🇺🇸 english</option> <option value="es">🇨🇴 spanish</option></>  : <><option value="es">🇨🇴 spanish</option><option value="en">🇺🇸 english</option> </>}        
    </select>
  );
};

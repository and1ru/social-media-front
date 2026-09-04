import { useThemContext } from "../../context/theme/ThemeContext";

export const Theme = () => {
    const { setTheme, theme } = useThemContext()

    const handleClick = () => {
        setTheme(!theme)
        if(theme){
            document.documentElement.classList.remove("dark")
            
        } else {
            document.documentElement.classList.add("dark")
        }
    }

  return (
    <div 
        className="border w-25 h-10 p-2 rounded-2xl"
        onClick={handleClick}>
        <div 
            className={`border w-10 rounded-full h-full ${ theme ? "translate-x-full" : ""}  transition 1s`}>
        </div>
    </div>
  );
};

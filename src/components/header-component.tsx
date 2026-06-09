import { useNavigate } from "react-router-dom";

export const HeaderComponent = () => {
    const navegar = useNavigate()
    const onClick = (url:string) => {
        navegar(url, {replace:true})
    }
  return (
    <header className="p-3 border-b">
        <nav>
            <ul className="flex justify-around">
                <li onClick={() => onClick("chats")}>chat</li>
                <li onClick={() => onClick("social")}>social</li>
                <li onClick={() => onClick("friends")}>friends</li>
                <li onClick={() => onClick("/login")}>salir</li>
            </ul>
        </nav>
    </header>
  );
};

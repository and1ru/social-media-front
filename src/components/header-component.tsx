import { useNavigate } from "react-router-dom";

export const HeaderComponent = () => {
    const navegar = useNavigate()
    const onClick = (url:string) => {
        navegar(url, {replace:true})
    }
  return (
    <header>
        <nav>
            <ul>
                <li onClick={() => onClick("chats")}>chat</li>
                <li onClick={() => onClick("social")}>social</li>
                <li onClick={() => onClick("friends")}>friends</li>
            </ul>
        </nav>
    </header>
  );
};

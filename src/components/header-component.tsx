import { Link } from "react-router-dom";
import { ButtonLogOut } from "./button-logOut";

export const HeaderComponent = () => {
  return (
    <header className="">
        <nav>
            <ul className="flex justify-around">
                <li className="py-4 px-5 rounded-lg">Chat App</li>
                <li className="hover:bg-gray-200 hover:border-b-2 py-4 px-5 rounded-lg">
                    <Link to={"/private/chats"}>chat</Link>
                </li>
                <li className="hover:bg-gray-200 hover:border-b-2 py-4 px-5 rounded-lg">
                    <Link to={"/private/social"}>Social</Link>
                </li>
                <li className="hover:bg-gray-200 hover:border-b-2 py-4 px-5 rounded-lg">
                    <Link to={"/private/friends"}>Friends</Link>    
                </li>
                <li className="px-3 py-2">
                    <ButtonLogOut/>
                </li>
            </ul>
        </nav>
    </header>
  );
};

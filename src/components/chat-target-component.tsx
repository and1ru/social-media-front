import { useNavigate } from "react-router-dom";
import { socket } from "../cutomhooks/api.socket";

interface Props {
  name:string;
  id: string;
}

export const ChatTargetComponent = ({name, id}:Props) => {
  const navegar = useNavigate()

  function onClickNavegar() {
    socket.emit("join-chat",{
      friendId: id
    })
    navegar(`/private/chat/${id}`, {replace:true})
  }

  return (
    <div className="border rounded-lg p-3 h-20" onClick={onClickNavegar}>
      <p>{name}</p>
    </div>
  );
};

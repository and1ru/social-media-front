import { useNavigate } from "react-router-dom";

interface Props {
  name:string;
  id: string;
}

export const ChatTargetComponent = ({name, id}:Props) => {
  const navegar = useNavigate()

  function onClickNavegar() {
    navegar(`/private/chat/${id}`, {replace:true})
  }

  return (
    <div className="border rounded-lg p-3 h-20" onClick={onClickNavegar}>
      <p>{name}</p>
    </div>
  );
};

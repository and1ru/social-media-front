import { useNavigate } from "react-router-dom";

export const ChatTargetComponent = () => {
  const navegar = useNavigate()

  function onClickNavegar() {
    navegar("/private/chat", {replace:true})
  }

  return (
    <div className="border rounded-lg p-3 h-20" onClick={onClickNavegar}>
      <p>nombre</p>
    </div>
  );
};

import { useParams } from "react-router-dom";

interface Props {
    message: string;
    createAt: string;
    senderId: string;
}

export const MessageTargetComponent = ({createAt, message, senderId }:Props) => {
  const { id } = useParams()
  let messagePosition = true

  if(id !== senderId ){
    messagePosition = false
  }

  return (
    <div className={`min-w-30 max-w-50 border p-3 rounded-lg ${ messagePosition ? "" : "relative left-40"}`}>
        <p>{message}</p>
        <p className="left-full">{createAt}</p>
    </div>
  );
};
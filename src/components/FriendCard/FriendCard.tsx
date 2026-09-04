import { AcceptRequestButton } from "../AcceptRequestButton/AcceptRequestButton"
import { RejectRequestButton } from "../RejectRequestButton/RejectRequestButton";

interface Props {
  id:string;
  name:string
}

export const FriendCard = ({id, name}:Props) => {
  return (
    <div className="border rounded-lg p-3 flex justify-between">
        <p>{name}</p>
        <div className="self-end">
          <AcceptRequestButton requestId={id}/>
          <RejectRequestButton id={id} />
        </div>
    </div>
  );
};

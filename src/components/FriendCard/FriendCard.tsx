import { AcceptRequestButton } from "../AcceptRequestButton/AcceptRequestButton"
import { RejectRequestButton } from "../RejectRequestButton/RejectRequestButton";

interface Props {
  id:string;
}

export const FriendCard = ({id}:Props) => {
  return (
    <div className="border rounded-lg p-3 flex justify-between">
        <p>nombre</p>
        <div className="self-end">
          <AcceptRequestButton requestId={id}/>
          <RejectRequestButton id={id} />
        </div>
    </div>
  );
};

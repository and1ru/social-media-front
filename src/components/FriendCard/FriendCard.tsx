import { AcceptRequest } from "./accept-request/accept-request";
import { RejectRequest } from "./reject-request";

interface Props {
  id:string;
}

export const FriendCard = ({id}:Props) => {
  return (
    <div className="border rounded-lg p-3 flex justify-between">
        <p>nombre</p>
        <div className="self-end">
          <AcceptRequest requestId={id}/>
          <RejectRequest id={id} />
        </div>
    </div>
  );
};

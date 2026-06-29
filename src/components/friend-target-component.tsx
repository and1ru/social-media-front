import { AcceptRequest } from "./accept-request";
import { RejectRequest } from "./reject-request";

interface Props {
  id:string;
}

export const FreindTargetComponent = ({id}:Props) => {
  return (
    <div className="border rounded-lg p-3">
        <p>nombre</p>
        <AcceptRequest requestId={id}/>
        <RejectRequest id={id} />
    </div>
  );
};

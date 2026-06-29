import { useAcceptRequest } from "../cutomhooks/useAcceptRequst";

interface Props {
  requestId:string;
}

export const AcceptRequest = ({requestId}:Props) => {
    const {acceptRequest, error, loading } = useAcceptRequest()

    const handleClick = async () => {
      await acceptRequest(requestId)
    }

    if(error) return <p>error</p>
    if(loading) return <p>loading</p>
  return (
    <button onClick={handleClick} className="bg-green-500 p-2 rounded-lg mr-3">accept request</button>
  );
};

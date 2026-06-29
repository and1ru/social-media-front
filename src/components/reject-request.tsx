import { useRejectRequest } from "../cutomhooks/useRejectRequest";

interface Props {
  id:string;
}

export const RejectRequest = ({id}:Props) => {
    const {error, loading, rejectRequest} = useRejectRequest()

    const handleClick = async () => {
      await rejectRequest(id)
    }

    if(error) return <p>error</p>
    if(loading) return <p>loading</p>
  return (
    <button onClick={handleClick} className="bg-red-500 p-2 rounded-lg">reject request</button>
  );
};

import { useGetRequest } from "../../cutomhooks/useGetRequest/useGetRequest";
import { useRejectRequest } from "../../cutomhooks/useRejectRequest/useRejectRequest";

interface Props {
  id:string;
}

export const RejectRequestButton = ({id}:Props) => {
    const {error, loading, rejectRequest, success} = useRejectRequest()
    const { refetch } = useGetRequest()

    const handleClick = async () => {
      await rejectRequest(id)
      if(success){
        refetch()
      }
    }
    
    if(error) return <p>error</p>
    if(loading) return <p>loading</p>
  return (
    <button onClick={handleClick} className="bg-red-500 p-2 rounded-lg">reject request</button>
  );
};

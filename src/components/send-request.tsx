import { useSendRequest } from "../cutomhooks/useSendRequest";

interface Props {
  id:string;
}

export const SendRequest = ({id}:Props) => {
    const {error, loading, sendRequest, success} = useSendRequest()

    const handleClick = () => {
      sendRequest(id)
    }

    if(error) <p>error</p>
    if(loading) <p>loading</p>
  return (
    <button onClick={handleClick}>send request</button>
  );
};

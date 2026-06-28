import { useSendRequest } from "../cutomhooks/useSendRequest";

export const SendRequest = () => {
    const {error, loading, sendRequest, success} = useSendRequest()
  return (
    <button onClick={sendRequest}>send request</button>
  );
};

import { useAcceptRequest } from "../cutomhooks/useAcceptRequst";

export const AcceptRequest = () => {
    const {acceptRequest, error, loading, success} = useAcceptRequest()
  return (
    <button onClick={acceptRequest}>accept request</button>
  );
};

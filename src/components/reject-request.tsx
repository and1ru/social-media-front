import { useRejectRequest } from "../cutomhooks/useRejectRequest";

export const RejectRequest = () => {
    const {error, loading, rejectRequest, success} = useRejectRequest()
  return (
    <button onClick={rejectRequest}>reject request</button>
  );
};

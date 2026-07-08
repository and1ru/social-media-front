import { useGetMessages } from "../cutomhooks/useGetMessages";
import { MessageTargetComponent } from "./message-target-component";

interface messageT {
    _id:string
    senderId: string;
    message: string;
    createAt: string;
}

interface Props {
    id:string;
}

export const MessageComponent = ({ id }:Props) => {
    const { data } = useGetMessages<messageT>(id)

  return (
            <div className="flex flex-col gap-5 h-122 border p-3 overflow-auto">
                {data.map((message) => <MessageTargetComponent createAt={message.createAt} message={message.message} key={message._id}/> )}
        </div>
  );
};

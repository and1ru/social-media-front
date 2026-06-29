import { SendRequest } from "./send-request";

interface Props {
    name:string;
    id:string;
}
export const UserTarget = ({name, id}:Props) => {
    return (
        <div className="border p-4 rounded-lg">
            <p>{name}</p>
            <SendRequest id={id}/>
        </div>
    );
};

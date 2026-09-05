interface Props {
  id:string;
  name:string
  onReject:(id:string) => Promise<void>
  onAccept:(id:string) => Promise<void>
}

export const FriendCard = ({id, name, onAccept, onReject}:Props) => {
  return (
    <div 
      className="border rounded-lg p-3 flex justify-between dark:bg-gray-500 dark:border-white" >
        <p className="dark:text-white">{name}</p>
        <div className="self-end">
          <button onClick={() => onAccept(id)} className="bg-green-500 p-2 rounded-lg mr-3">accept</button>
          <button onClick={() => onReject(id)} className="bg-red-500 p-2 rounded-lg">reject</button>
        </div>
    </div>
  );
};

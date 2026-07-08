interface Props {
    message: string;
    createAt: string;
}

export const MessageTargetComponent = ({createAt, message}:Props) => {
  return (
    <div className="min-w-30 max-w-50 border p-3 rounded-lg">
        <p>{message}</p>
        <p className="left-full">{createAt}</p>
    </div>
  );
};
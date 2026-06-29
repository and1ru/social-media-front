interface Props {
    name:string;
}
export const UserTarget = ({name}:Props) => {
    return (
        <div className="border p-4 rounded-lg">
            <p>{name}</p>
            <button className="border p-2 rounded-lg">enviar solicitud</button>
        </div>
    );
};

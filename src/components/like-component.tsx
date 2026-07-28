import { useGetLikes } from "../cutomhooks/useGetLikes";
import { useLikes } from "../cutomhooks/useLikes";

interface Props {
    id:string
}

export const LikeComponent = ({id}: Props) => {
    const { data, error, like, loading } = useLikes(id)
    const { likes, refetch } = useGetLikes(id)

    const handleClick = async () => {
        await like()
        await refetch()
    }

    return (
        <button 
            onClick={handleClick}
            className="flex flex-1 justify-center rounded-lg py-2 transition hover:bg-gray-100">
            {likes?.liked ? "❤️" : " 🤍 "} { likes?.likes}
        </button>
    );
};

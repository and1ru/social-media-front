import { useGetLikes } from "../../cutomHooks/useGetLikes/useGetLikes";
import { useLikes } from "../../cutomHooks/useLikes/useLikes";

interface Props {
    id:string
}

export const LikeButton = ({id}: Props) => {
    const { like } = useLikes(id)
    const { data, refetch } = useGetLikes(id)

    const handleClick = async () => {
        await like()
        await refetch()
    }

    return (
        <button 
            onClick={handleClick}
            className="flex flex-1 justify-center rounded-lg py-2 transition hover:bg-gray-100 dark:hover:bg-gray-600">
            {data?.result?.liked ? "❤️" : " 🤍 "} { data?.result.likes}
        </button>
    );
};
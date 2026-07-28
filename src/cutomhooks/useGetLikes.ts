import { useEffect, useState } from "react"
import { apiClient } from "./api.client"

interface DataI{
    message:string;
    liked: boolean;
    likes: number
}

export const useGetLikes = (postId: string) => {
    const [likes, setData] = useState<DataI>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const like = async () => {
        setLoading(true)
        try {
            const request = await apiClient.get(`like/${postId}`)
            setData(request.data)
        } catch (error) {
            console.error(error)
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=> {
        like()
    },[])

    return { likes, loading, error, refetch:like}
}
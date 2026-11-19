import { useEffect, useState } from "react"
import { apiClient } from "../api.client";

interface Response {
    result: {
        liked: boolean;
        likes: number
    }
    message: string;
    success: boolean
}

export const useGetLikes = (postId: string) => {
    const [data, setData] = useState<Response>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const like = async () => {
        setLoading(true)
        try {
            const request = await apiClient.get(`like/${postId}`)
            setData(request.data)
        } catch (error) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        like()
    }, [])

    return { data, loading, error, refetch: like }
}
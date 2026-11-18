import { useState } from "react"
import { apiClient } from "../api.client";

interface Response {
    message: string
    success: boolean
    result: {
        liked: boolean;
        likes: number
    }
}

export const useLikes = (postId: string) => {
    const [data, setData] = useState<Response>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const like = async () => {
        setLoading(true)
        setError(false)
        try {
            const request = await apiClient.post(`like/${postId}`)
            setData(request.data)
        } catch (error) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    return { data, loading, error, like }
}
import { useState } from "react"
import { apiClient } from "./api.client"

interface DataI{
    message:string;
    liked: boolean;
    likes: number
}

export const useLikes = (postId: string) => {
    const [data, setData] = useState<DataI>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const like = async () => {
        setLoading(true)
        try {
            const request = await apiClient.post(`like/${postId}`)
            setData(request.data)
        } catch (error) {
            console.error(error)
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    return { data, loading, error, like}
}
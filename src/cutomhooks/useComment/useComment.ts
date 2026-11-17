import { useState } from "react"
import { apiClient } from "../api.client";

interface BodyT {
    postId: string,
    comment: string;
}

interface Response {
    message: string;
    success: boolean;
}

export const useComment = () => {
    const [data, setData] = useState<Response>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const comment = async (body: BodyT) => {
        setLoading(true)
        setError(false)
        try {
            const request = await apiClient.post("comment", body)
            setData(request.data)
        } catch (error) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    return { data, loading, error, comment}
}
import { useState } from "react"
import { apiClient } from "../api.client";

interface BodyT {
    postId: string,
    comment: string;
}

export const useComment = () => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const comment = async (body: BodyT) => {
        setLoading(true)
        try {
            const request = await apiClient.post("comment", body)
            console.log(request.data)
            setData(request.data)
        } catch (error) {
            setError(true)
            console.error(error)
        }

    }

    return { data, loading, error, comment}
}
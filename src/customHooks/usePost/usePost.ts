import { useEffect, useState } from "react"
import { apiClient } from "../api.client";

interface Post{
    _id: string;
    content: string;
    fecha:string;
    userId:string;
    name:string;
}

interface Response {
    message: string
    success: boolean
    result: Post
}

export const usePost = (postId:string) => {
    const [data, setData] = useState<Response>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const getComment = async () => {
        setLoading(true)
        try {
            const request = await apiClient.get(`post/${postId}`)
            setData(request.data)
        } catch (error) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=> {
        getComment()
    },[])

    return { data, loading, error, refetch:getComment}
}
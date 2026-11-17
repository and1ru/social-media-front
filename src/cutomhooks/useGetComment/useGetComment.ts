import { useEffect, useState } from "react"
import { apiClient } from "../api.client";

interface Comment {
    _id:string;
    postId:string;
    userId:string;
    comment:string;
    userName:string
}

interface DataT {
    commentCount: number;
    comments: Comment[]
}

interface Response {
    result: DataT
    success: boolean
    message: string
}

export const useGetComment = (postId:string) => {
    const [data, setData] = useState<Response>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const getComment = async () => {
        setLoading(true)
        try {
            const request = await apiClient.get(`comments/${postId}`)
            setData(request.data)
        } catch (error) {
            console.error(error)
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
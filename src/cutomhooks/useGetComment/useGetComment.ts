import { useEffect, useState } from "react"
import { apiClient } from "../api.client";

interface Comment {
    _id:string;
    postId:string;
    userId:string;
    comment:string;
}

interface DataT {
    message: string;
    commentCount: number;
    comments: Comment[]
}

export const useGetComment = (postId:string) => {
    const [data, setData] = useState<DataT>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const getComment = async () => {
        setLoading(true)
        try {
            const request = await apiClient.get(`comments/${postId}`)
            console.log(request.data)
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
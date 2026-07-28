import { useEffect, useState } from "react"
import { apiClient } from "./api.client"

interface DataT {
    comment:string;
    userId:string;
    _id:string
}

export const useGetComment = (postId:string) => {
    const [data, setData] = useState<DataT[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const getComment = async () => {
        setLoading(true)
        try {
            const request = await apiClient.get(`comments/${postId}`)
            setData(request.data.result)
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
import { useEffect, useState } from "react"
import { apiClient } from "./api.client"

interface DataI{
    _id: string;
    content: string;
    fecha:string;
    userId:string;
    name:string;
}

export const usePostUser = (userId:string) => {
    const [data, setData] = useState<DataI[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const getComment = async () => {
        setLoading(true)
        try {
            const request = await apiClient.get(`post-user/${userId}`)
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
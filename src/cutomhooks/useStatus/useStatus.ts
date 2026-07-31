import { useEffect, useState } from "react"
import { apiClient } from "../api.client"

interface DataI {
    message:string;
    result: boolean
}
export const useStatus = (id:string) => {
    const [data, setData] = useState<DataI>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const status = async () => {
        setLoading(true)
        try {
            const request = await apiClient.get(`status/${id}`)
            console.log(request.data)
            setData(request.data)
        } catch (error) {
            console.error(error)
            setError(true)
        } finally{
            setLoading(false)
        }
    }

    useEffect(()=> {
        status()
    },[])

    return { data, loading, error, }
}
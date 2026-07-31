import { useEffect, useState } from "react"
import { apiClient } from "./api.client"
import { isAxiosError } from "axios"

export const useGetMessages = <T>(friendId:string) => {
    const [data, setData] = useState<T[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const getMessages =  async () => {
        setLoading(true)
        try {
            const request = await apiClient.get(`get-messages/${friendId}`, {withCredentials:true})
            setData(request.data.result)
            console.log(request.data)
            setSuccess(true)
        } catch (error) {
            if(isAxiosError(error)){
                console.log(error.response?.data)
                console.log(error.response?.status)
            }
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=> {
        getMessages()
    },[])

    return {data, loading, success, error}
}
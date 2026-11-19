import { useEffect, useState } from "react"
import { apiClient } from "../api.client"

interface MessageT {
    _id: string;
    senderId: string;
    message: string;
    createAt: string;
}

interface Response {
    message: string
    success: boolean
    result: MessageT[]
}

export const useGetMessages = (friendId:string) => {
    const [data, setData] = useState<Response>()
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const getMessages =  async () => {
        setLoading(true)
        setError(false)
        setSuccess(false)
        try {
            const request = await apiClient.get(`get-messages/${friendId}`)
            setData(request.data)
            setSuccess(true)
        } catch (error) {
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
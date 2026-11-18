import { useEffect, useState } from "react"
import { apiClient } from "../api.client"
import type { requestType } from "../../schemas/request-schema"

interface Response {
    message: string
    success: boolean
    result: requestType[]
}

export const useGetRequest = () => {
    const [data, setData] = useState<Response>()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)

    const getRequest = async () => {
        setLoading(true)
        setError(false)
        setSuccess(false)
        try {
            const request = await apiClient.get("get-requests")
            setData(request.data)
            setSuccess(true)
        } catch (error) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=> {
        getRequest()
    },[])

    return {data, loading, error, success, refetch:getRequest}
}
import { isAxiosError } from "axios"
import { useEffect, useState } from "react"
import { apiClient } from "./api.client"

export const useGetRequest = <T>() => {
    const [data, setData] = useState<T[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)

    const getRequest = async () => {
        setLoading(true)
        try {
            const request = await apiClient.get("get-requests", {withCredentials:true})
            console.log(request.data)
            setData(request.data.result)
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
        getRequest()
    },[])

    return {data, loading, error, success}
}
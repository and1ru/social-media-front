import { useEffect, useState } from "react"
import { apiClient } from "./api.client"
import { isAxiosError } from "axios"

export const useFindUsers = <T>(name:string) => {
    const [data, setData] = useState<T[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const findUsers =  async () => {
        setLoading(true)
        try {
            const request = await apiClient.get(`find-users/${name}`)
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
        findUsers()
    },[])

    return {data, loading, success, error}
}
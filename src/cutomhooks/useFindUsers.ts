import { useEffect, useState } from "react"
import { apiClient } from "./api.client"

export const useFindUsers = <T>() => {
    const [data, setData] = useState<null | T>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const findUsers =  async () => {
        setLoading(true)
        try {
            const request = await apiClient.get(`find-users`)
            setData(request.data)
            setSuccess(true)
        } catch (error) {
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
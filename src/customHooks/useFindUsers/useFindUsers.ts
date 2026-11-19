import { useEffect, useState } from "react"
import { apiClient } from "../api.client"
import type { userType } from "../../schemas/user-schema"

export const useFindUsers = (name:string) => {
    const [data, setData] = useState<userType[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const findUsers =  async () => {
        setLoading(true)
        setSuccess(false)
        setError(false)
        try {
            const request = await apiClient.get(`find-users/${name}`)
            setData(request.data.result)
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

    return {data, loading, success, error, refetch:findUsers}
}
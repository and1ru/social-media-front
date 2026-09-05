import { useState } from "react"
import { apiClient } from "../api.client"

export const useRejectRequest = () => {
    const [loading, setLoading] = useState(false)
    const [successReject, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const rejectRequest = async (id:string) => {
        setLoading(true)
        setSuccess(false)
        try {
            await apiClient.put("reject-request", {id}, {withCredentials:true})
            setSuccess(true)
        } catch (error) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    return { loading, successReject, error, rejectRequest }
}
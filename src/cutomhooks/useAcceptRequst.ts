import { useState } from "react"
import { apiClient } from "./api.client"

export const useAcceptRequest = () => {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const acceptRequest = async () => {
        setLoading(true)
        try {
            const requset = await apiClient.post("")
            setSuccess(true)
        } catch (error) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    return {loading, success, error, acceptRequest}
}
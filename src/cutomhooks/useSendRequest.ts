import { useState } from "react"
import { apiClient } from "./api.client"

export const useSendRequest = () => {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const sendRequest = async () => {
        setLoading(true)
        try {
            const requset = await apiClient.post("")
            console.log(requset.data)
            setSuccess(true)
        } catch (error) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    return { loading, success, error, sendRequest }
}
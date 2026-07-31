import { useState } from "react"
import { apiClient } from "./api.client"

export const useAcceptRequest = () => {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const acceptRequest = async (id:string) => {
        setLoading(true)
        try {
            const request = await apiClient.put("accept-request", {id})
            console.log(request.data)
            setSuccess(true)
        } catch (error) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    return {loading, success, error, acceptRequest}
}
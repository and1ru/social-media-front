import { useState } from "react"
import { apiClient } from "../api.client"

export const useLogOut = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const logOut = async () => {
        setLoading(true)
        setError(false)
        setSuccess(false)

        try {
            await apiClient.post("log-out")
            setSuccess(true)
        } catch (error) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    return {loading, success, logOut, error}
}
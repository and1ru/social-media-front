import { useEffect, useState } from "react"
import { apiClient } from "./api.client"
import axios from "axios"

export const useAuth = () => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    const auth = async () => {
        try {
            const request = await apiClient.get("auth/me", { withCredentials: true })
            setAuthenticated(request.data.success)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.status);
                console.log(error.response?.data);
                console.log(error.response?.data.message);
            }
            setAuthenticated(false)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        auth()
    }, [])

    return { loading, authenticated }
}
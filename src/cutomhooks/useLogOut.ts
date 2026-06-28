import { useState } from "react"
import { apiClient } from "./api.client"

export const useLogOut = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)

    const logOut = async () => {
        setLoading(true)
        try {
            const request = await apiClient.post("log-out", {}, {withCredentials:true})
            console.log(request.data)
            setSuccess(true)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return {loading, success, logOut}
}
import { useState } from "react"
import { apiClient } from "./api.client"
import { isAxiosError } from "axios"

export const useSendRequest = () => {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const sendRequest = async (receiver:string) => {
        setLoading(true)
        try {
            console.log("se envio la request")
            const request = await apiClient.post("send-request", {receiver}, {withCredentials:true})
            console.log(request.data)
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

    return { loading, success, error, sendRequest }
}
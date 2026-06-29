import { isAxiosError } from "axios"
import { useState } from "react"
import { apiClient } from "./api.client"

export const useCreatePost = () => {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const createPost = async (content:string) => {
        setLoading(true)
        try {
            await apiClient.post("create-post", { content }, {withCredentials:true})
            setSuccess(true)
        } catch (error) {
            if(isAxiosError(error)){
                console.log(error.response?.status)
                console.log(error.response?.data)
            }
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    return {loading, success, error, createPost}
}
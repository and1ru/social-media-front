import { isAxiosError } from "axios"
import { useState } from "react"
import { apiClient } from "../api.client"

export const useDeletePost = () => {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const deletePost = async (postId:string) => {
        setLoading(true)
        setSuccess(false)
        try {
            await apiClient.delete(`post/${postId}`)
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

    return {loading, success, error, deletePost}
}
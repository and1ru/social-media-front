import { useState } from "react"
import { apiClient } from "../api.client"

export const useDeletePost = () => {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const deletePost = async (postId:string) => {
        setLoading(true)
        setSuccess(false)
        setError(false)
        try {
            await apiClient.delete(`post/${postId}`)
            setSuccess(true)
        } catch (error) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    return {loading, success, error, deletePost}
}
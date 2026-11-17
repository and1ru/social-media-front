import { useState } from "react"
import { apiClient } from "../api.client"

export const useCreatePost = () => {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const createPost = async (content:string) => {
        setLoading(true)
        setSuccess(false)
        setError(false)
        try {
            await apiClient.post("create-post", { content })
            setSuccess(true)
        } catch (error) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    return {loading, success, error, createPost}
}